"use client"

import { NavBar, Notification } from "@/components/NavBar/NavBar"
import Sidebar from "@/components/SideBar/SideBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada"
import LocationsMap from "@/components/Mapa/mapa"

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
                        <div className="flex gap-6 text-blue-600 text-lg font-semibold">
                        <a href="https://ejemplo.com/link1" target="_blank" rel="noopener noreferrer">Distribución</a>
                        <a href="https://ejemplo.com/link2" target="_blank" rel="noopener noreferrer">Locaciones</a>
                        </div>
                    }
                />
                <div className="flex gap-10"> 
                    <div className="w-1/2 flex flex-col gap-6"> 
                        <SearchBar />
                        <TablaAvanzada />
                    </div>
                    <div className="w-[500px] h-[500px] shrink-0 overflow-hidden rounded-lg border shadow-md">
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
