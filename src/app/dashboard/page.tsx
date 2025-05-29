"use client";
import Carrusel from "@/components/Carrusel/Carrusel";
import { LineChartComp } from "@/components/Chart/LineChart";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { NavBar } from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import { TablaBasica } from "@/components/TablaBasica/TablaBasica";
import { Red_Hat_Display, Prompt } from "next/font/google";
import { usePathname } from "next/navigation";
import { months } from "@/lib/months";
import {ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Notification } from "@/types/Notification";
import { useAuth } from "@/providers/AuthProvider";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });
const redhat_700 = Red_Hat_Display({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

const distribuciones = [
  {
    usuario: "Ana Chávez",
    fecha: "24 de Abril, 2025",
  },
  {
    usuario: "Adrián Gonzalez",
    fecha: "23 de Abril, 2025",
  },
  {
    usuario: "Rosa Pérez",
    fecha: "23 de Abril, 2025",
  },
  {
    usuario: "Axel Torres",
    fecha: "22 de Abril, 2025",
  },
  {
    usuario: "Luis Fernández",
    fecha: "20 de Abril, 2025",
  },
];

const menoresPerdidas = [
  {
    usuario: "Ana García",
    icon: "down",
    kg: "2,3 kg",
  },
  {
    usuario: "Carlos López",
    icon: "up",
    kg: "3,1 kg",
  },
  {
    usuario: "María Rodríguez",
    icon: "up",
    kg: "3,8 kg",
  },
  {
    usuario: "Juan Pérez",
    icon: "down",
    kg: "4,2 kg",
  },
  {
    usuario: "Sofia Martínez",
    icon: "up",
    kg: "4,7 kg",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isGeneral = pathname === "/dashboard";
  const isReportes = pathname === "/reportes";
  const notificaciones: Notification[] = [{ description: "S" }];

  const getTendenciaIcon = (valor: string) => {
    return valor === "up" ? (
      <ArrowUpRight className="text-green-500 w-5 h-5" />
    ) : (
      <ArrowDownRight className="text-red-500 w-5 h-5" />
    );
  };


  if (!user) return null;

  return (
    <Sidebar>
      <div
        id="tesss"
        className="p-5 flex flex-col gap-5 w-full min-h-screen overflow-y-auto"
      >
        <NavBar
          title="Dashboard"
          opts={[]}
          selected={0}
          notificaciones={notificaciones}
          onValueChange={() => {}}
        />
        <div className="flex">
          <div className="w-3/5 h-auto px-5">
            <div>
              <h2
                className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B]`}
              >
                Alimento Neto
              </h2>
              <DataContainerDashboard />
              <Carrusel data={months} />
            </div>
            <div>
              <h2
                className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B]`}
              >
                Pérdidas de alimento
              </h2>
              <LineChartComp />
            </div>
          </div>
          <div className="w-2/5 h-auto px-5">
            <TablaBasica
              titulo="Menor Pérdida por Usuario"
              encabezados={[
                { label: "Usuario", key: "usuario", align: "left" },
                {
                  label: "",
                  key: "icon", 
                  icono: (_valor, fila) => getTendenciaIcon(fila.icon),
                  align: "center"
                },
                { label: "Pérdida", key: "kg", align: "right" },
              ]}
              datos={menoresPerdidas}
            />


            <TablaBasica 
              titulo="Distribución Reciente"
              encabezados={[
                { label: "Usuario", key: "usuario" },
                { label: "Fecha", key: "fecha", align: "right"}
              ]}
              datos={distribuciones}
            />

          </div>
        </div>
      </div>
    </Sidebar>
  );
}