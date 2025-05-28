"use client"

import { useState } from "react"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import Sidebar from "@/components/SideBar/SideBar"
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada"
import { Prompt } from "next/font/google"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })

export default function SitioTabla() {
  const [searchText, setSearchText] = useState("")
  const [filterClasificacion, setFilterClasificacion] = useState("")
  const [filterPrioridad, setFilterPrioridad] = useState("")

  const notificaciones: Notification[] = [{ description: "S" }]

  return (
    <Sidebar>
      <div className="flex flex-1 flex-col p-5 gap-5 h-screen overflow-y-auto">
        <NavBar
          title="Inventario"
          opts={[]}
          selected={0}
          notificaciones={notificaciones}
          onValueChange={() => {}}
          center={
            <div className={`flex gap-6 text-lg font-semibold ${prompt.className}`}></div>
          }
        />
        <SearchBar
          searchText={searchText}
          onSearchTextChange={setSearchText}
          filterClasificacion={filterClasificacion}
          onFilterClasificacionChange={setFilterClasificacion}
          filterPrioridad={filterPrioridad}
          onFilterPrioridadChange={setFilterPrioridad}
        />
        <div className="w-full overflow-auto">
          <TablaAvanzada
            searchText={searchText}
            filterClasificacion={filterClasificacion}
            filterPrioridad={filterPrioridad}
          />
        </div>
      </div>
    </Sidebar>
  )
}
