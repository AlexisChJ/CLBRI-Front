"use client";
import Carrusel from "@/components/Carrusel/Carrusel";
import { LineChartComp } from "@/components/Chart/LineChart";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { NavBar, Notification } from "@/components/NavBar/NavBar";
import Sidebar from "@/components/SideBar/SideBar";
import { TablaBasica } from "@/components/TablaBasica/TablaBasica";
import { is } from "date-fns/locale";
import { Prompt, Red_Hat_Display } from "next/font/google";
import { usePathname } from "next/navigation";
import { months } from "@/lib/months";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });
const redhat_700 = Red_Hat_Display({weight: "700", subsets: ['latin'], preload: true,})

export default function Dashboard() {
  const pathname = usePathname();
  const isGeneral = pathname === "/dashboard";
  const isReportes = pathname === "/reportes";
  const notificaciones: Notification[] = [{ description: "S" }];
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
              <h2 className={`${ redhat_700.className} text-xl font-semibold text-[#5B5B5B]` }>Alimento Neto</h2>
              <DataContainerDashboard />
              <Carrusel data={months}/>
            </div>
            <div >
              <h2 className={`${ redhat_700.className} text-xl font-semibold text-[#5B5B5B]` }>Pérdidas de alimento</h2>
              <LineChartComp/>
            </div>
          </div>
          <div className="w-2/5 h-auto px-5">
            <TablaBasica/>
            <TablaBasica/>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
