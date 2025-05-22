"use client"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import Sidebar from "@/components/SideBar/SideBar"
import { Prompt } from "next/font/google"

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true })

export default function Perfil() {
    const notificaciones: Notification[] = [{ description: "S" }]
    return (
        <Sidebar>
            <div className="flex flex-1 flex-col p-5 gap-5 h-screen overflow-y-auto">
                <NavBar
                    title="Perfil"
                    opts={[]}
                    selected={0}
                    notificaciones={notificaciones}
                    onValueChange={() => {}}
                    center={""}
                />
                <div className="w-full overflow-auto">
                    
                </div>
            </div>
        </Sidebar>
    )

}