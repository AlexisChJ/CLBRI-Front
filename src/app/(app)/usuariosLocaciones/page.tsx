"use client";
import { useState } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import TablaUsuarios from "@/components/TablaUsuarios/TablaUsuarios";
import LocationsMap from "@/components/Mapa/mapa";
import { Input } from "@/components/ui/input";
import Buttons from "@/components/Buttons/Buttons";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { Prompt, Zen_Maru_Gothic } from "next/font/google";
import { getLatLngFromAddress } from "@/lib/geocode";
import { Notification } from "@/types/Notification";
import { useAuth } from "@/providers/AuthProvider";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });
const zen_700 = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

const usuariosDB = [
  {
    id: "003",
    nombre: "Carlos Ramírez",
    address: "Insurgentes Sur 1234",
    city: "CDMX",
    state: "CDMX",
    country: "México",
    postalCode: "03100",
  },
  {
    id: "004",
    nombre: "Lucía Torres",
    address: "Av. Juárez 200",
    city: "Guadalajara",
    state: "Jalisco",
    country: "México",
    postalCode: "44100",
  },
  {
    id: "005",
    nombre: "María López",
    address: "Calle 5 de Mayo 150",
    city: "Puebla",
    state: "Puebla",
    country: "México",
    postalCode: "72000",
  },
  {
    id: "006",
    nombre: "Juan Pérez",
    address: "Av. Universidad 300",
    city: "Monterrey",
    state: "Nuevo León",
    country: "México",
    postalCode: "64000",
  },
  {
    id: "007",
    nombre: "Ana Hernández",
    address: "Blvd. Díaz Ordaz 100",
    city: "Tijuana",
    state: "Baja California",
    country: "México",
    postalCode: "22010",
  },
  {
    id: "008",
    nombre: "Miguel Sánchez",
    address: "Calle Reforma 250",
    city: "Mérida",
    state: "Yucatán",
    country: "México",
    postalCode: "97000",
  },
  {
    id: "009",
    nombre: "Laura Gómez",
    address: "Av. Central 400",
    city: "Toluca",
    state: "Estado de México",
    country: "México",
    postalCode: "50000",
  },
  {
    id: "010",
    nombre: "Pedro Castillo",
    address: "Calle Hidalgo 75",
    city: "Querétaro",
    state: "Querétaro",
    country: "México",
    postalCode: "76000",
  },
  {
    id: "011",
    nombre: "Sofía Morales",
    address: "Av. Morelos 180",
    city: "Cuernavaca",
    state: "Morelos",
    country: "México",
    postalCode: "62000",
  },
  {
    id: "012",
    nombre: "Jorge Ruiz",
    address: "Calle Independencia 60",
    city: "León",
    state: "Guanajuato",
    country: "México",
    postalCode: "37000",
  },
  {
    id: "013",
    nombre: "Patricia Fernández",
    address: "Av. Colón 500",
    city: "Veracruz",
    state: "Veracruz",
    country: "México",
    postalCode: "91700",
  },
  {
    id: "014",
    nombre: "Ricardo Mendoza",
    address: "Calle Zaragoza 120",
    city: "San Luis Potosí",
    state: "San Luis Potosí",
    country: "México",
    postalCode: "78000",
  },
];

export default function AdministerUsers() {
  const { user } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<{ id: string; nombre: string; lugarTrabajo: string }[]>([]);
  const [userLocations, setUserLocations] = useState<{ lat: number; lng: number; title: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [tokenPopupOpen, setTokenPopupOpen] = useState(false);
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");

  const notificaciones: Notification[] = [{ description: "S" }];

  function generateToken(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.lugarTrabajo.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search)
  );

  const usuariosDisponibles = usuariosDB.filter(dbUser => !usuarios.some(u => u.id === dbUser.id));

  const handleAdd = async () => {
    const user = usuariosDB.find((u) => u.id === selectedUserId);
    if (!user) return;

    const fullAddress = `${user.address}, ${user.city}, ${user.state}, ${user.country}, ${user.postalCode}`;
    const coords = await getLatLngFromAddress(fullAddress);

    setUsuarios([
      ...usuarios,
      {
        id: user.id,
        nombre: user.nombre,
        lugarTrabajo: fullAddress,
      },
    ]);

    if (coords) {
      setUserLocations([
        ...userLocations,
        { lat: coords.lat, lng: coords.lng, title: user.nombre },
      ]);
    }

    setPopupOpen(false);
    setSelectedUserId("");
  };

  if (!user) return null;

  return (
    <Sidebar>
      <div id="tesss" className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto">
        <NavBar
          title="Locaciones"
          opts={[]}
          selected={0}
          notificaciones={notificaciones}
          onValueChange={() => {}}
        />

        <div className="flex flex-row gap-3 h-auto max-h-[625px]">
          <div className="w-3/5 flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              <Buttons
                color="register"
                text="Generar Token"
                className="flex-1"
                onClick={() => {
                  setToken(generateToken());
                  setTokenPopupOpen(true);
                }}
              />
              <Buttons
                color="login"
                text="Agregar Usuario"
                className="flex-1"
                onClick={() => setPopupOpen(true)}
              />
            </div>
            <Input
              type="search"
              placeholder="Buscar"
              className={`${zen_700.className} bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-full`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex-1 overflow-hidden">
              <TablaUsuarios
                usuarios={filteredUsuarios}
                setUsuarios={setUsuarios}
                userLocations={userLocations}
                setUserLocations={setUserLocations}
              />
            </div>
          </div>

        <div className="w-2/5 flex flex-col gap-5 h-auto">
          <LocationsMap
            adminLocation={{
              lat: 19.284056,
              lng: -99.135333,
              title: undefined,
            }}
            userLocations={userLocations}
          />
        </div>
      </div>

        <PopUpWindow open={popupOpen} onClose={() => setPopupOpen(false)}>
          <div className="m-5">
            <h3 className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}>
              Agregar usuario
            </h3>
            <select
              className="w-full border rounded p-2 mb-4"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Selecciona un usuario</option>
              {usuariosDisponibles.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre} - {u.address}, {u.city}
                </option>
              ))}
            </select>
            <Buttons
              color="login"
              text="Agregar"
              className="w-full"
              onClick={handleAdd}
              disabled={!selectedUserId}
            />
          </div>
        </PopUpWindow>

        <PopUpWindow open={tokenPopupOpen} onClose={() => setTokenPopupOpen(false)}>
          <div className="m-5">
            <h3 className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}>
              Token Generado
            </h3>
            <p className="text-center text-lg">{token}</p>
            <Buttons
              color="register"
              text="Cerrar"
              className="w-full mt-4"
              onClick={() => setTokenPopupOpen(false)}
            />
          </div>
        </PopUpWindow>
      </div>
    </Sidebar>
  );
}
