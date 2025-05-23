"use client"

import Buttons from "@/components/Buttons/Buttons"
import { CountryCombobox } from "@/components/CountryCombobox/CountryCombobox"
import { WhiteLogo } from "@/components/LogoBlanco/LogoBlanco"
import { PasswordInput } from "@/components/PasswordInput/PasswordInput"
import { TextInput } from "@/components/TextInput/TextInput"
import { Red_Hat_Display } from "next/font/google"
import React, { useState } from "react"

// Carga de fuente desde next/font con preload
const redhat_700 = Red_Hat_Display({ weight: "700", subsets: ['latin'], preload: true })

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [postalCode, setPostalCode] = useState("")
  

    return (
        <div className="flex min-h-screen">
            {/* Imagen de fondo */}
            <div className="relative flex w-1/2 min-h-screen">
                <img       
                    className="w-full h-full object-cover"
                    src="https://cdn1.matadornetwork.com/blogs/2/2018/12/colibri-Jiri-Hrebicek-shutterstock_1178773135.jpg"
                    alt="CLBRI"
                />
                <div className="absolute inset-0 bg-[#3A70C3] opacity-55 z-10" />
                <div className="absolute bottom-[100px] w-full flex justify-center z-20">
                    <WhiteLogo />
                </div>
            </div>

            {/* Formulario */}
            <div className="flex flex-col justify-center mx-auto w-full max-w-md gap-7 p-6">
                <h4 className={`${redhat_700.className} text-[#3A70C3] text-center text-4xl`}>
                    Registro
                </h4>

                <TextInput
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordInput
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="flex gap-4">
                    <TextInput
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextInput
                        placeholder="Apellidos"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>

                <TextInput
                    placeholder="Dirección"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="flex gap-4">
                    <TextInput
                        placeholder="Ciudad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextInput
                        placeholder="Estado"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <TextInput
                        placeholder="Código Postal"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <CountryCombobox />
                </div>

                <Buttons
                    color="login"
                    text="Registrarse"
                />
            </div>
        </div>
    )
}

export default SignUpPage
