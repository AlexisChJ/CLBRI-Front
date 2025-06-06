"use client";

import { useState } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Prompt } from "next/font/google";
import { useAuth } from "@/providers/AuthProvider";
import TablaMerma from "@/components/TablaMerma/TablaMerma";
import Buttons from "@/components/Buttons/Buttons";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function SitioTabla() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");

  if (!user) return null;

  return (
    <div className="flex flex-col p-5 gap-5 overflow-y-auto h-full">
      <NavBar
        title="Usuarios"
        opts={[]}
        selected={0}
        onValueChange={() => {}}
        center={
          <div
            className={`flex gap-6 text-lg font-semibold ${prompt.className}`}
          ></div>
        }
      />
      <div className="flex flex-row gap-5">
        <div className="w-4/5">
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
          text="Guardar"
          color="register"
          className="w-1/5 px-6"
          buttonSize="default"
          // onClick={}
        />
      </div>
      <TablaMerma
        searchText={searchText}
        filterClasificacion={filterClasificacion}
        filterPrioridad={filterPrioridad}
      />
    </div>
  );
}
