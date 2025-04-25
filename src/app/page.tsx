import Carrusel from "@/components/Carrusel/Carrusel";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { BlueLogo } from "@/components/Logo Azul/logoAzul";
import { WhiteLogo } from "@/components/Logo Blanco/LogoBlanco";
import { SearchBar } from "@/components/Search Bar/SearchBar";
import SideBar from "@/components/SideBar/SideBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import { TablaBasica } from "@/components/Tabla Básica/TablaBasica";

export default function Home() {

  return (
    <div className="w-full flex bg-slate-200 min-h-screen">
      <SideBar children={undefined} />
      <main className="flex-1 p-60">
        <div className="max-w-9xl mx-auto">
          <BlueLogo/> <WhiteLogo/>
          <SearchBar />
          <TablaBasica />
          <DataContainerDashboard />
        </div>
      </main>
    </div>
  );
}