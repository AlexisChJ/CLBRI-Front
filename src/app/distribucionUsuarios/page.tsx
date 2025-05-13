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
            <NavBar title="Usuarios" opts={[]} selected={0} notificaciones={notificaciones} onValueChange={() => {}}/>
            <SearchBar />
            <div style={{ display: 'flex', gap: '40px' }}>
                <TablaAvanzada />
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
        </Sidebar>
    )
}