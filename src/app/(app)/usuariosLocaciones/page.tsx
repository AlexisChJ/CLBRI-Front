"use client";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import TablaUsuarios from "@/components/TablaUsuarios/TablaUsuarios";
import LocationsMap from "@/components/Mapa/mapa";
import { Input } from "@/components/ui/input";
import Buttons from "@/components/Buttons/Buttons";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { Prompt, Zen_Maru_Gothic } from "next/font/google";
import { getLatLngFromAddress } from "@/lib/geocode";
import { useAuth } from "@/providers/AuthProvider";
import { UserLocation } from "@/types/UserLocation";
import { getUserLocations } from "@/services/admin/getUserLocations";
import { TokenInvitationService } from "@/services/admin/TokenInvitation";

import { User } from "firebase/auth";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });
const zen_700 = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

const useUsers = (adminUser: User | null) => {
  const [usuariosDB, setUsuariosDB] = useState<UserLocation[]>([]);

  useEffect(() => {
    const fetchUserLocations = async () => {
      if (!adminUser) return;

      const token = await adminUser.getIdToken();
      const usersData = await getUserLocations(token);
      setUsuariosDB(usersData.map(value => ({
        id: value.id + "",
        nombre: value.name,
        address: value.location.address,
        city: value.location.city,
        state: value.location.state,
        country: value.location.country,
        postalCode: value.location.postalCode,
      })));
    }
    fetchUserLocations();
  }, [adminUser]);

  return { usuariosDB };
}

export default function AdministerUsers() {
  const { user } = useAuth();
  const { usuariosDB } = useUsers(user);
  const [popupOpen, setPopupOpen] = useState(false);
  const [usuarios, setUsuarios] = useState<
    { id: string; nombre: string; lugarTrabajo: string }[]
  >([]);
  const [userLocations, setUserLocations] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [tokenPopupOpen, setTokenPopupOpen] = useState(false);

  // Estados para el token por correo
  const [tokenEmail, setTokenEmail] = useState("");
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const notificaciones: Notification[] = [{ description: "S" }];

  function generateToken(length = 12) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }

  const filteredUsuarios = usuarios.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.lugarTrabajo.toLowerCase().includes(search.toLowerCase()) ||
      u.id.includes(search)
  );

  const usuariosDisponibles = usuariosDB.filter(
    (dbUser) => !usuarios.some((u) => u.id === dbUser.id)
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

  // Generar token usando el servicio
  const handleGenerateToken = async () => {
    setTokenLoading(true);
    setTokenError(null);
    setToken("");
    try {
      const result = await TokenInvitationService({ email: tokenEmail });
      // Ajusta según la respuesta real de tu backend
      if (typeof result === "string") {
        setToken(result);
      } else if (typeof result === "object" && result.token) {
        setToken(result.token);
      } else {
        setTokenError("No se pudo generar el token.");
      }
    } catch {
      setTokenError("Error al generar el token.");
    }
    setTokenLoading(false);
  };

  if (!user) return null;

  return (
    <div
      id="tesss"
      className="p-5 flex flex-col gap-5 overflow-y-auto h-full"
    >
      <NavBar
        title="Locaciones"
        opts={[]}
        selected={0}
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
                setTokenPopupOpen(true);
                setTokenEmail("");
                setToken("");
                setTokenError(null);
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

      <PopUpWindow
        open={tokenPopupOpen}
        onClose={() => {
          setTokenPopupOpen(false);
          setTokenEmail("");
          setToken("");
          setTokenError(null);
        }}
      >
        <div className="m-5 flex flex-col gap-4">
          <h3
            className={`${prompt.className} text-[#3A70C3] text-center text-4xl m-5`}
          >
            Generar Token
          </h3>
          <Input
            type="email"
            placeholder="Correo electrónico"
            className="w-full"
            value={tokenEmail}
            onChange={(e) => setTokenEmail(e.target.value)}
          />
          <Buttons
            color="register"
            text={tokenLoading ? "Generando..." : "Generar Token"}
            className="w-full"
            onClick={handleGenerateToken}
            disabled={!tokenEmail || tokenLoading}
          />
          {token && (
            <div className="text-center mt-4">
              <span className="font-bold">Token generado:</span>
              <div className="text-lg break-all">{token}</div>
            </div>
          )}
          {tokenError && (
            <div className="text-center text-red-500">{tokenError}</div>
          )}
          <Buttons
            color="register"
            text="Cerrar"
            className="w-full mt-2"
            onClick={() => {
              setTokenPopupOpen(false);
              setTokenEmail("");
              setToken("");
              setTokenError(null);
            }}
          />
        </div>
      </PopUpWindow>
    </div>
  );
}