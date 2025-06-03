"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import TablaUsuarios from "@/components/TablaUsuarios/TablaUsuarios";
import LocationsMap from "@/components/Mapa/mapa";
import { Input } from "@/components/ui/input";
import Buttons from "@/components/Buttons/Buttons";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { Prompt } from "next/font/google";
import { getLatLngFromAddress } from "@/lib/geocode";
import { Notification } from "@/types/Notification";
import { useAuth } from "@/providers/AuthProvider";
import { Zen_Maru_Gothic } from "next/font/google";

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
];

const usuariosPrueba = [
  { id: "001", lugarTrabajo: "Av. Reforma 123, CDMX", nombre: "Juan Pérez" },
  { id: "002", lugarTrabajo: "Calle 10 #45, CDMX", nombre: "Ana López" },
  {
    id: "003",
    lugarTrabajo: "Blvd. Constituyentes 50, Querétaro",
    nombre: "Carlos García",
  },
  {
    id: "004",
    lugarTrabajo: "Prol. Montejo 200, Mérida",
    nombre: "Sofía Rodríguez",
  },
  {
    id: "005",
    lugarTrabajo: "Av. Insurgentes Sur 800, CDMX",
    nombre: "Luis Hernández",
  },
  {
    id: "006",
    lugarTrabajo: "Miguel Alemán 30, Monterrey",
    nombre: "Valeria Díaz",
  },
  {
    id: "007",
    lugarTrabajo: "Paseo de la Reforma 250, CDMX",
    nombre: "Ricardo Torres",
  },
  {
    id: "008",
    lugarTrabajo: "Av. Juárez 15, Guadalajara",
    nombre: "Gabriela Castro",
  },
  {
    id: "009",
    lugarTrabajo: "Calle 5 de Mayo 100, Puebla",
    nombre: "Fernando Vargas",
  },
  {
    id: "010",
    lugarTrabajo: "Av. Universidad 600, CDMX",
    nombre: "Elena Morales",
  },
  {
    id: "011",
    lugarTrabajo: "Bosque de Ciruelos 160, CDMX",
    nombre: "Pablo Ruiz",
  },
  {
    id: "012",
    lugarTrabajo: "Calzada del Valle 120, Monterrey",
    nombre: "Andrea Salazar",
  },
  {
    id: "013",
    lugarTrabajo: "Av. Patria 900, Guadalajara",
    nombre: "Diego Jiménez",
  },
  {
    id: "014",
    lugarTrabajo: "Calle Madero 45, San Luis Potosí",
    nombre: "Mariana Rojas",
  },
  {
    id: "015",
    lugarTrabajo: "Vasco de Quiroga 300, CDMX",
    nombre: "Jorge Guzmán",
  },
  {
    id: "016",
    lugarTrabajo: "Circuito Interior 70, CDMX",
    nombre: "Claudia Blanco",
  },
  {
    id: "017",
    lugarTrabajo: "Benito Juárez 500, Cancún",
    nombre: "Roberto Flores",
  },
  {
    id: "018",
    lugarTrabajo: "Av. Tecnológico 10, Querétaro",
    nombre: "Isabel Núñez",
  },
  { id: "019", lugarTrabajo: "Santa Fe 100, CDMX", nombre: "Héctor Maldonado" },
  { id: "020", lugarTrabajo: "Periférico Sur 400, CDMX", nombre: "Laura Soto" },
];

export default function AdministerUsers() {
  const { user } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);
  const [usuarios, setUsuarios] = useState(usuariosPrueba);
  const [userLocations, setUserLocations] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [tokenPopupOpen, setTokenPopupOpen] = useState(false);
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const isDistribucion = pathname === "/distribucionUsuarios";
  const isLocaciones = pathname === "/usuariosLocaciones";
  const notificaciones: Notification[] = [{ description: "S" }];

  function generateToken(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let t = "";
    for (let i = 0; i < length; i++) {
      t += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return t;
  }

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      u.lugarTrabajo.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search)
  );

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
    <div id="tesss" className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <NavBar
        title="Locaciones"
        opts={[]}
        selected={0}
        notificaciones={notificaciones}
        onValueChange={() => {}}
      />

      <div className="flex flex-row gap-3 h-full">
        <div className="w-3/5 flex flex-col gap-5 h-auto">
          <div className="flex gap-5 items-center">
            <Buttons
              color="register"
              text="Generar Token"
              className="flex-1"
              buttonSize="default"
              onClick={() => {
                setToken(generateToken());
                setTokenPopupOpen(true);
              }}
            />
            <Buttons
              color="login"
              text="Agregar Usuario"
              className="flex-1"
              buttonSize="default"
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
          <TablaUsuarios usuarios={filteredUsuarios} />
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
          <h3
            className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}
          >
            Agregar usuario
          </h3>
          <select
            className="w-full border rounded p-2 mb-4"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Selecciona un usuario</option>
            {usuariosDB.map((u) => (
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

      <PopUpWindow
        open={tokenPopupOpen}
        onClose={() => setTokenPopupOpen(false)}
      >
        <div className="m-5">
          <h3
            className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}
          >
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
  );
}
