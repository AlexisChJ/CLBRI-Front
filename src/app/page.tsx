import Carrusel from "@/components/Carrusel/Carrusel";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import SideBar from "@/components/SideBar/SideBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";

export default function Home() {
  return (
    <div className="w-full flex bg-slate-200">
      <SideBar children={undefined} />
      <TablaAvanzada />
    </div>
  );
}
