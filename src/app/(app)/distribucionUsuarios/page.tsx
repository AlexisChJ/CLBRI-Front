"use client";

import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import LocationsMap from "@/components/Mapa/mapa";
import { Prompt } from "next/font/google";
import { useState } from "react";
import Buttons from "@/components/Buttons/Buttons";
import { useAuth } from "@/providers/AuthProvider";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow"; // Add this import
import { motion } from "framer-motion"; // Add this import if not already imported
import { Download, ChevronDown } from "lucide-react"; // Add this import for the download icon
import { products } from "@/lib/products";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

// Sample data - in real app, this would come from props or API
const usuariosPrueba = [
  { id: "001", lugarTrabajo: "Av. Reforma 123, CDMX", nombre: "Juan Pérez" },
  { id: "002", lugarTrabajo: "Calle 10 #45, CDMX", nombre: "Ana López" },
  {
    id: "003",
    lugarTrabajo: "Blvd. Constituyentes 50, Querétaro",
    nombre: "Carlos García",
  },
  {
    id: "004",
    lugarTrabajo: "Prol. Montejo 200, Mérida",
    nombre: "Sofía Rodríguez",
  },
  {
    id: "005",
    lugarTrabajo: "Av. Insurgentes Sur 800, CDMX",
    nombre: "Luis Hernández",
  },
  {
    id: "006",
    lugarTrabajo: "Miguel Alemán 30, Monterrey",
    nombre: "Valeria Díaz",
  },
  {
    id: "007",
    lugarTrabajo: "Paseo de la Reforma 250, CDMX",
    nombre: "Ricardo Torres",
  },
  {
    id: "008",
    lugarTrabajo: "Av. Juárez 15, Guadalajara",
    nombre: "Gabriela Castro",
  },
  {
    id: "009",
    lugarTrabajo: "Calle 5 de Mayo 100, Puebla",
    nombre: "Fernando Vargas",
  },
  {
    id: "010",
    lugarTrabajo: "Av. Universidad 600, CDMX",
    nombre: "Elena Morales",
  },
  {
    id: "011",
    lugarTrabajo: "Bosque de Ciruelos 160, CDMX",
    nombre: "Pablo Ruiz",
  },
  {
    id: "012",
    lugarTrabajo: "Calzada del Valle 120, Monterrey",
    nombre: "Andrea Salazar",
  },
  {
    id: "013",
    lugarTrabajo: "Av. Patria 900, Guadalajara",
    nombre: "Diego Jiménez",
  },
  {
    id: "014",
    lugarTrabajo: "Calle Madero 45, San Luis Potosí",
    nombre: "Mariana Rojas",
  },
  {
    id: "015",
    lugarTrabajo: "Vasco de Quiroga 300, CDMX",
    nombre: "Jorge Guzmán",
  },
  {
    id: "016",
    lugarTrabajo: "Circuito Interior 70, CDMX",
    nombre: "Claudia Blanco",
  },
  {
    id: "017",
    lugarTrabajo: "Benito Juárez 500, Cancún",
    nombre: "Roberto Flores",
  },
  {
    id: "018",
    lugarTrabajo: "Av. Tecnológico 10, Querétaro",
    nombre: "Isabel Núñez",
  },
  { id: "019", lugarTrabajo: "Santa Fe 100, CDMX", nombre: "Héctor Maldonado" },
  { id: "020", lugarTrabajo: "Periférico Sur 400, CDMX", nombre: "Laura Soto" },
];

export default function VistaMapa() {
  const { user } = useAuth();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [distributionType, setDistributionType] = useState<
    "manual" | "automatico" | null
  >(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [currentDistributionType, setCurrentDistributionType] = useState(null);
  const [productDistributions, setProductDistributions] = useState({});
  const [rows, setRows] = useState(products);

  const handleDistributionClick = (type: "manual" | "automatico" | null) => {
    setDistributionType(type);
  };

  const confirmarDistribucion = () => {
    console.log(`Confirmando distribución ${distributionType}`);
    setCurrentDistributionType(distributionType);
    setDistributionType(null);
    setShowDownloadPopup(true);
  };
  const descargarPDF = () => {
    if (currentDistributionType === "manual") {
      console.log("Generando distribución manual");
      console.log("Distribuciones:", productDistributions);
    } else {
      console.log("Descargando PDF de distribución automática");
    }
    setShowDownloadPopup(false);
    setCurrentDistributionType(null);
  };

  // Handle location assignment for products
  const handleLocationAssignment = (productId: number, locationId: string) => {
    setProductDistributions((prev) => ({
      ...prev,
      [productId]: locationId,
    }));
  };

  // Close download popup
  const cerrarPopupDescarga = () => {
    setShowDownloadPopup(false);
    setCurrentDistributionType(null);
    setProductDistributions({}); // Reset distributions when closing
  };

  // Close popup
  const cerrarPopup = () => {
    setDistributionType(null);
  };

  if (!user) return null;

  return (
    <div id="tesss" className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <NavBar
        title="Distribución"
        opts={[]}
        selected={0}
        onValueChange={() => {}}
      />

      <div className="flex flex-row gap-3 h-full">
        <div className="w-3/5 flex flex-col gap-5 h-auto">
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            filterClasificacion={filterClasificacion}
            onFilterClasificacionChange={setFilterClasificacion}
            filterPrioridad={filterPrioridad}
            onFilterPrioridadChange={setFilterPrioridad}
          />
          <TablaAvanzada
            searchText={searchText}
            filterClasificacion={filterClasificacion}
            filterPrioridad={filterPrioridad}
            rows={rows}
            setRows={setRows}
          />
        </div>

        <div className="w-2/5 flex flex-col gap-5 h-auto">
          <div className="flex gap-3">
            <Buttons
              text="Manual"
              color="register"
              className="flex-1 px-6"
              buttonSize="default"
              onClick={() => handleDistributionClick("manual")}
            />
            <Buttons
              text="Automático"
              color="login"
              className="flex-1 px-6"
              buttonSize="default"
              onClick={() => handleDistributionClick("automatico")}
            />
          </div>
          <LocationsMap
            adminLocation={{
              lat: 19.284056,
              lng: -99.135333,
              title: undefined,
            }}
            userLocations={[]}
          />
        </div>
      </div>

      {/* Distribution Confirmation Popup */}
      <PopUpWindow open={distributionType !== null} onClose={cerrarPopup}>
        <h2 className="text-lg font-bold mb-4">
          ¿Estás seguro de que deseas confirmar la distribución{" "}
          {distributionType}?
        </h2>
        <p className="text-gray-600 mb-6">
          {distributionType === "manual"
            ? "Procederás a distribuir los productos de forma manual."
            : "El sistema distribuirá los productos automáticamente."}
        </p>
        <div className="flex justify-end space-x-2">
          <motion.button
            onClick={cerrarPopup}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={confirmarDistribucion}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`px-4 py-2 text-white rounded transition duration-200 ${
              distributionType === "manual"
                ? "bg-green-600 hover:bg-green-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Confirmar
          </motion.button>
        </div>
      </PopUpWindow>

      {/* Distribution Assignment Popup - Shows for both Manual and Automatic */}
      <PopUpWindow
        open={showDownloadPopup}
        onClose={cerrarPopupDescarga}
        width="max-w-5xl"
      >
        <div className="max-w-none w-full max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-6">
            {currentDistributionType === "manual"
              ? "Distribución Manual - Asignar Locaciones"
              : "Distribución Automática Completada"}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            {currentDistributionType === "manual"
              ? "Asigna manualmente una locación de destino para cada producto."
              : "La distribución automática se ha completado. Revisa las asignaciones y descarga el reporte."}
          </p>

          {/* Products Distribution Table */}
          <div className="mb-8 overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="border-b-2 border-gray-200 px-8 py-4 text-left font-bold text-gray-700 text-base">
                    Producto
                  </th>
                  <th className="border-b-2 border-gray-200 px-8 py-4 text-left font-bold text-gray-700 text-base">
                    Clasificación
                  </th>
                  <th className="border-b-2 border-gray-200 px-8 py-4 text-left font-bold text-gray-700 text-base">
                    Prioridad
                  </th>
                  <th className="border-b-2 border-gray-200 px-8 py-4 text-left font-bold text-gray-700 text-base min-w-[400px]">
                    {currentDistributionType === "manual"
                      ? "Asignar Destino"
                      : "Destino Asignado"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((producto, index) => (
                  <tr
                    key={producto.id || index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border-b border-gray-100 px-8 py-5 font-semibold text-gray-800">
                      {producto.nombre}
                    </td>
                    <td className="border-b border-gray-100 px-8 py-5">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {producto.clasificacion}
                      </span>
                    </td>
                    <td className="border-b border-gray-100 px-8 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          producto.prioridad === "Alta"
                            ? "bg-red-100 text-red-800"
                            : producto.prioridad === "Media"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {producto.prioridad}
                      </span>
                    </td>
                    <td className="border-b border-gray-100 px-8 py-5">
                      {currentDistributionType === "manual" ? (
                        <div className="relative">
                          <select
                            value={productDistributions[index] || ""}
                            onChange={(e) =>
                              handleLocationAssignment(index, e.target.value)
                            }
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm font-medium transition-all duration-200 hover:border-gray-400"
                          >
                            <option value="">Seleccionar destino...</option>
                            {usuariosPrueba.map((usuario) => (
                              <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} - {usuario.lugarTrabajo}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={20}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                          />
                        </div>
                      ) : (
                        <div className="px-5 py-3 bg-green-50 border-2 border-green-200 rounded-lg">
                          <span className="text-green-800 font-semibold text-sm">
                            Asignado automáticamente
                          </span>
                          <div className="text-sm text-green-600 mt-1 font-medium">
                            {
                              usuariosPrueba[
                                Math.floor(
                                  Math.random() * usuariosPrueba.length
                                )
                              ].nombre
                            }
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <motion.button
              onClick={cerrarPopupDescarga}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="px-8 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200 font-semibold text-gray-700"
            >
              Cancelar
            </motion.button>
            <motion.button
              onClick={descargarPDF}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2 font-semibold shadow-lg"
              disabled={
                currentDistributionType === "manual" &&
                Object.keys(productDistributions).length === 0
              }
            >
              <Download size={20} />
              {currentDistributionType === "manual"
                ? "Generar Distribución"
                : "Descargar PDF"}
            </motion.button>
          </div>
        </div>
      </PopUpWindow>
    </div>
  );
}
