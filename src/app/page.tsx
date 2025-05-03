"use client"

import Buttons from "@/components/Buttons/Buttons";
import { BlueLogo } from "@/components/LogoAzul/LogoAzul";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { SocialMedia } from "@/components/SocialMedia/SocialMedia";
import { TextInput } from "@/components/TextInput/TextInput";
import { useState } from "react"

import { Zen_Maru_Gothic } from "next/font/google";

const zen_500 = Zen_Maru_Gothic({weight: "500", subsets: ["latin"], preload: true })

export default function Home() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

  return (
    <div className="flex">
      <div className="relative flex w-1/2 h-auto">
        <img 
          className="h-screen object-cover"
          src="https://cdn1.matadornetwork.com/blogs/2/2018/12/colibri-Jiri-Hrebicek-shutterstock_1178773135.jpg" 
          alt="CLBRI"/>
        <div className="absolute inset-0 bg-[#3A70C3] opacity-55 z-10" />
        <div className="absolute flex bottom-[25px] w-full justify-center z-20">
          <SocialMedia/>
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/2 h-auto">
        <div className="flex flex-col mx-auto w-3/5 gap-7 text-center">
          <BlueLogo/>
          <TextInput
            id="email"
            value={email}
            placeholder="Correo"
            className=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            id="password"
            value={password}
            placeholder="Contraseña"
            className=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="https://www.dummies.com/book/technology/programming-web-design/general-programming-web-design/beginning-programming-all-in-one-for-dummies-2nd-edition-292091/" className={`${ zen_500.className } underline text-[#9B9B9B] hover:text-[#3A70C3]`}>¿Olvidaste tu contraseña?</a>
          <Buttons className="" text={"Iniciar Sesión"} color="login"/>
          <p className={`${ zen_500.className } text-[#9B9B9B]`}>¿No tienes una cuenta?</p>
          <Buttons text={"Registrarse"} color="register"/>
        </div>
      </div>
    </div>
  );
}
