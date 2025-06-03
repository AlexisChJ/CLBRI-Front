"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import { Prompt } from "next/font/google";
import { Notification } from "@/types/Notification";
import { useAuth } from "@/providers/AuthProvider";
import Buttons from "@/components/Buttons/Buttons";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function SitioTabla() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");

  const notificaciones: Notification[] = [{ description: "S" }];

  if (!user) return null;

  return (
    // No height??
    <div className="flex flex-col p-5 gap-5 overflow-y-auto">
      <NavBar
        title="Inventario"
        opts={[]}
        selected={0}
        notificaciones={notificaciones}
        onValueChange={() => {}}
        center={
          <div
            className={`flex gap-6 text-lg font-semibold ${prompt.className}`}
          ></div>
        }
      />
      <div className="flex flex-row gap-5">
        <div className="w-full">
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            filterClasificacion={filterClasificacion}
            onFilterClasificacionChange={setFilterClasificacion}
            filterPrioridad={filterPrioridad}
            onFilterPrioridadChange={setFilterPrioridad}
          />
        </div>
        <Buttons
          text="+"
          color="login"
          className="w-auto px-6"
          buttonSize="default"
        />
      </div>
      <TablaAvanzada
        searchText={searchText}
        filterClasificacion={filterClasificacion}
        filterPrioridad={filterPrioridad}
      />
    </div>
  );
}
