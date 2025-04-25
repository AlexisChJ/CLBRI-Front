import Carrusel from "@/components/Carrusel/Carrusel";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { BlueLogo } from "@/components/LogoAzul/logoAzul";
import { WhiteLogo } from "@/components/LogoBlanco/LogoBlanco";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import SideBar from "@/components/SideBar/SideBar";

export default function Home() {

  return (
    <div className="w-full flex bg-slate-200 min-h-screen">
      <SideBar children={undefined} />
      <main className="flex-1 p-60">
        <div className="max-w-9xl mx-auto">
          <BlueLogo/> <WhiteLogo/>
          <SearchBar />
          <DataContainerDashboard />
        </div>
      </main>
    </div>
  );
}