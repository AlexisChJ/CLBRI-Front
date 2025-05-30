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
    postalCode: "44100"
  },
  {
    id: "005",
    nombre: "María González",
    address: "Calle 5 de Mayo 150",
    city: "Monterrey",
    state: "Nuevo León",
    country: "México",
    postalCode: "64000"
  },
  {
    id: "006",
    nombre: "Pedro Sánchez",
    address: "Av. Universidad 3000",
    city: "CDMX",
    state: "CDMX",
    country: "México",
    postalCode: "04510"
  },
  {
    id: "007",
    nombre: "Sofía Herrera",
    address: "Blvd. Atlixcáyotl 2301",
    city: "Puebla",
    state: "Puebla",
    country: "México",
    postalCode: "72810"
  },
  {
    id: "008",
    nombre: "Miguel Ángel Ruiz",
    address: "Calle Morelos 45",
    city: "Toluca",
    state: "Estado de México",
    country: "México",
    postalCode: "50000"
  }
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
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const pathname = usePathname();
  const isDistribucion = pathname === "/distribucionUsuarios";
  const isLocaciones = pathname === "/usuariosLocaciones";
  const notificaciones: Notification[] = [{ description: "S" }];

  function generateToken(length = 12) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
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

  const totalPages = Math.ceil(filteredUsuarios.length / rowsPerPage);
  const paginatedUsuarios = filteredUsuarios.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Solo muestra usuarios que no estén ya en la tabla
  const usuariosDisponibles = usuariosDB.filter(
    dbUser => !usuarios.some(u => u.id === dbUser.id)
  );

  const handleAdd = async () => {
    const user = usuariosDB.find(u => u.id === selectedUserId);
    if (!user) return;

    const lugarTrabajo = `${user.address}, ${user.city}, ${user.state}, ${user.country}`;

    const coords = await getLatLngFromAddress(
      `${user.address}, ${user.city}, ${user.state}, ${user.country}, ${user.postalCode}`
    );

    setUsuarios([
      ...usuarios,
      {
        id: user.id,
        nombre: user.nombre,
        lugarTrabajo
      }
    ]);

    if (coords) {
      setUserLocations([
        ...userLocations,
        { lat: coords.lat, lng: coords.lng, title: user.nombre }
      ]);
    }

    setPopupOpen(false);
    setSelectedUserId("");
  };

  if (!user) return null;

  return (
    <Sidebar>
      <div className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto">
        <NavBar
          title="Usuarios"
          opts={[]}
          selected={0}
          notificaciones={notificaciones}
          onValueChange={() => {}}
          center={
            <div className={`flex gap-6 text-lg font-semibold ${prompt.className}`}>
              <a
                href="/distribucionUsuarios"
                className={`transition-transform duration-200 ${
                  isDistribucion
                    ? "text-blue-600 scale-110"
                    : "text-gray-500 hover:text-blue-600 hover:scale-110"
                }`}
              >
                Distribución
              </a>
              <a
                href="/usuariosLocaciones"
                className={`transition-transform duration-200 ${
                  isLocaciones
                    ? "text-blue-600 scale-110"
                    : "text-gray-500 hover:text-gray-500 hover:scale-105"
                }`}
              >
                Locaciones
              </a>
            </div>
          }
        />

        <div className="flex flex-col lg:flex-row gap-15 w-full items-stretch justify-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-2 h-[900px] overflow-y-auto">
            <div className="flex gap-5 items-center mb-4">
              <div className="flex-1 basis-3/4 rounded-full">
                <Input
                  type="search"
                  placeholder="Buscar"
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md w-full"
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <div className="basis-1/4">
                <Buttons
                  color="register"
                  text="Generar Token"
                  className="w-full"
                  onClick={() => {
                    setToken(generateToken());
                    setTokenPopupOpen(true);
                  }}
                />
              </div>
              <div className="basis-1/4">
                <Buttons
                  color="login"
                  text="Agregar Usuario"
                  className="w-full"
                  onClick={() => setPopupOpen(true)}
                />
              </div>
            </div>

            {/* Tabla con edición y borrado */}
            <TablaUsuarios
                usuarios={paginatedUsuarios}
                setUsuarios={setUsuarios}
                userLocations={userLocations}
                setUserLocations={setUserLocations}
            />

            {/* Paginación */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>
              <span>
                Página {currentPage} de {totalPages || 1}
              </span>
              <button
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[500px] h-[500px] shrink-0 overflow-hidden rounded-lg border shadow-md">
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

        {/* Pop-up para agregar usuario */}
        <PopUpWindow open={popupOpen} onClose={() => setPopupOpen(false)}>
          <div className="m-5">
            <h3 className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}>
              Agregar usuario
            </h3>
            <select
              className="w-full border rounded p-2 mb-4"
              value={selectedUserId}
              onChange={e => setSelectedUserId(e.target.value)}
            >
              <option value="">Selecciona un usuario</option>
              {usuariosDisponibles.map(u => (
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

        {/* Pop-up del token generado */}
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
