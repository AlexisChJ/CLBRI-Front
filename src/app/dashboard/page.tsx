"use client"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import Sidebar from "@/components/SideBar/SideBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada"
import LocationsMap from "@/components/Mapa/mapa"
import { Prompt } from "next/font/google"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })

export default function Dashboard() {
        const notificaciones: Notification[] = [{ description: "S" }]
        return (
            <Sidebar>
                <div id="tesss" className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto">            
                <NavBar
                    title="Dashboard"
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
                            General
                            </a>
                            <span className="text-gray-500 dark:text-white">Inventario</span>
                            <span className="text-gray-500 dark:text-white">Usuarios</span>
                            <span className="text-gray-500 dark:text-white">Reportes</span>
                        </div>
                    }/>
                </div>
            </Sidebar>
    )
}