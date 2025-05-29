"use client";
import { usePathname } from "next/navigation";
import { NavBar, Notification } from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import LocationsMap from "@/components/Mapa/mapa";
import { Prompt } from "next/font/google";
import { useState } from "react";
import Buttons from "@/components/Buttons/Buttons";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function vistaMapa() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const pathname = usePathname();
  const isDistribucion = pathname === "/distribucionUsuarios";
  const isLocaciones = pathname === "/usuariosLocaciones";
  const notificaciones: Notification[] = [{ description: "S" }];
  return (
    <Sidebar>
      <div
        id="tesss"
        className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto"
      >
        <NavBar
          title="Distribución"
          opts={[]}
          selected={0}
          notificaciones={notificaciones}
          onValueChange={() => {}}
        />

        <div className="flex flex-row gap-3 h-auto max-h-[625px]">
          <div className="w-3/5 flex flex-col gap-5">
            <SearchBar
              searchText={searchText}
              onSearchTextChange={setSearchText}
              filterClasificacion={filterClasificacion}
              onFilterClasificacionChange={setFilterClasificacion}
              filterPrioridad={filterPrioridad}
              onFilterPrioridadChange={setFilterPrioridad}
            />
            <div className="flex-1 overflow-hidden">
              <TablaAvanzada
                searchText={searchText}
                filterClasificacion={filterClasificacion}
                filterPrioridad={filterPrioridad}
              />
            </div>
          </div>

          <div className="w-2/5 flex flex-col gap-5 h-auto max-h-[625px]">
            <div className="flex gap-3">
              <Buttons
                text="Manual"
                color="register"
                className="flex-1"
              />
              <Buttons
                text="Automático"
                color="login"
                className="flex-1"
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-lg border shadow-md">
              <LocationsMap
                adminLocation={{
                  lat: 19.284056,
                  lng: -99.135333,
                  title: undefined,
                }}
                userLocations={[]}
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
