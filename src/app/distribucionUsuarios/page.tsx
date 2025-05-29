"use client"
import { usePathname } from "next/navigation"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import Sidebar from "@/components/SideBar/SideBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada"
import LocationsMap from "@/components/Mapa/mapa"
import { Prompt } from "next/font/google"
import { useState } from "react"
import Buttons from "@/components/Buttons/Buttons"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })

export default function vistaMapa() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchText, setSearchText] = useState("")
    const [filterClasificacion, setFilterClasificacion] = useState("")
    const [filterPrioridad, setFilterPrioridad] = useState("")
    const pathname = usePathname()
    const isDistribucion = pathname === "/distribucionUsuarios"
    const isLocaciones = pathname === "/usuariosLocaciones"
    const notificaciones: Notification[] = [{ description: "S" }]
        return (
                <Sidebar>
                <div id="tesss" className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto">            
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
                    }/>

                    <div className="flex flex-col lg:flex-row gap-3">
                        <div className="flex-1 flex flex-col gap-3">
                            <SearchBar
                            searchText={searchText}
                            onSearchTextChange={setSearchText}
                            filterClasificacion={filterClasificacion}
                            onFilterClasificacionChange={setFilterClasificacion}
                            filterPrioridad={filterPrioridad}
                            onFilterPrioridadChange={setFilterPrioridad}
                            />
                            <div className="flex-1 overflow-hidden mt-1.5">
                            <TablaAvanzada
                                searchText={searchText}
                                filterClasificacion={filterClasificacion}
                                filterPrioridad={filterPrioridad}
                            />
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-[500px] shrink-0 flex flex-col gap-3">
                            <div className="flex gap-3">
                            <Buttons text="Manual" color = "register" className="flex-1 px-6 py-2" />
                            <Buttons text="Automático" color = "login" className="flex-1 px-6 py-2" />
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
    )
}