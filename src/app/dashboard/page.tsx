"use client"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import Sidebar from "@/components/SideBar/SideBar"
import { is } from "date-fns/locale"
import { Prompt } from "next/font/google"
import { usePathname } from "next/navigation"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })

export default function Dashboard() {
    const pathname = usePathname()
    const isGeneral = pathname === "/dashboard"
    const isReportes = pathname === "/reportes"
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
                            href="/dashboard"
                            className={`transition-transform duration-200 ${
                            isGeneral
                                ? "text-blue-600 scale-110"
                                : "text-gray-500 hover:text-blue-600 hover:scale-110"
                            }`}
                        >
                            General
                        </a>
                        <a
                            href="/reportes"
                            className={`transition-transform duration-200 ${
                            isReportes
                                ? "text-blue-600 scale-110"
                                : "text-gray-500 hover:text-gray-500 hover:scale-105"
                            }`}
                        >
                           Reportes
                        </a>
                    </div>
                }/>
            </div>
        </Sidebar>
    )
}