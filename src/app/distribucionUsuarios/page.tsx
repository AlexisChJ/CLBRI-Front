"use client"

import { NavBar, Notification } from "@/components/NavBar/NavBar"
import Sidebar from "@/components/SideBar/SideBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada"
import LocationsMap from "@/components/Mapa/mapa"
import { Prompt } from "next/font/google"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })


export default function vistaMapa() {
    const notificaciones: Notification[] = [{ description: "S" }]
        return (
                <Sidebar>
                <div id="tesss" className="p-5 flex flex-col gap-5 w-full h-full pb-0">            
                <NavBar
                    title="Usuarios"
                    opts={[]}
                    selected={0}
                    notificaciones={notificaciones}
                    onValueChange={() => {}}
                    center={
                        <div className={`flex gap-6 text-lg font-semibold ${prompt.className}`}>
                            <a 
                            href="http://localhost:3000/distribucionUsuarios" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600"
                            >
                            Distribución
                            </a>
                            <span className="text-black dark:text-white">Locaciones</span>
                        </div>
                    }/>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">
                            <SearchBar />
                            <TablaAvanzada />
                        </div>

                        <div className="w-full lg:w-[500px] h-[500px] shrink-0 overflow-hidden rounded-lg border shadow-md">
                            <div className="w-full h-full">
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
