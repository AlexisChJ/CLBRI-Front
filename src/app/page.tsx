import Carrusel from "@/components/Carrusel/Carrusel";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import SideBar from "@/components/SideBar/SideBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";

export default function Home() {

  return (
    <div className="w-full flex bg-slate-200 min-h-screen">
      <SideBar children={undefined} />
      <main className="flex-1 p-60">
        <div className="max-w-9xl mx-auto">
          <TablaAvanzada />
          <DataContainerDashboard />
        </div>
      </main>
    </div>
  );
}