import Carrusel from "@/components/Carrusel/Carrusel";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import LocationsMap from "@/components/Mapa/mapa";
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer";
import SideBar from "@/components/SideBar/SideBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";

export default function Home() {

  const adminLocation = { lat: 19.4326, lng: -99.1332, title: "Oficinas Centrales" }
  const userLocations = [
    { lat: 19.4270, lng: -99.1677, title: "Usuario A" },
    { lat: 19.4400, lng: -99.1200, title: "Usuario B" },
  ]
  return (
    <div >
      <LocationsMap
          adminLocation={adminLocation}
          userLocations={userLocations}
        />
    </div>
  );
}