"use client"
import { NavBar, Notification } from "@/components/NavBar/NavBar"
import { SearchBar } from "@/components/SearchBar/SearchBar"
import Sidebar from "@/components/SideBar/SideBar"
import { Prompt } from "next/font/google"
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer"

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
                <div className="w-full flex justify-center mt-[10px]">
                    <ProfileContainer
                        avatarSrc="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" 
                        name="Juan Pérez"
                        organization="Skilliket Inc."
                        phone="555-123-4567"
                        email="juan@example.com"
                        passwordMask="••••••••"
                        address="Av. Siempre Viva 742"
                        onSave={(data) => {
                            console.log("Datos guardados:", data)
                        }}
                        />
                </div>
            </div>
        </Sidebar>
    )

}