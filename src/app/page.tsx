"use client"

import Carrusel from "@/components/Carrusel/Carrusel";
import { LineChartComp } from "@/components/Chart/LineChart";
import { CountryCombobox } from "@/components/CountryCombobox/CountryCombobox";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import LocationsMap from "@/components/Mapa/mapa";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer";
import SideBar from "@/components/SideBar/SideBar";
import { SocialMedia } from "@/components/SocialMedia/SocialMedia";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import { TextInput } from "@/components/TextInput/TextInput";
import { LineChart } from "lucide-react";
import { useState } from "react"

export default function Home() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	return (
		<div >
		<LineChartComp/>
		<CountryCombobox/>
		<DatePicker/>
		<SocialMedia/>
		<TextInput
			id="email"
			value={email}
			placeholder="Correo"
			onChange={(e) => setEmail(e.target.value)}
		/>
		<PasswordInput
			id="password"
			value={password}
			placeholder="Contraseña"
			onChange={(e) => setPassword(e.target.value)}
		/>
		</div>
	);
}
