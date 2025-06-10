"use client";

import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import LocationsMap from "@/components/Mapa/mapa";
import { Prompt } from "next/font/google";
import { useState, useEffect } from "react";
import Buttons from "@/components/Buttons/Buttons";
import { useAuth } from "@/providers/AuthProvider";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { motion } from "framer-motion"; 
import { Download, ChevronDown, MapPin, Package, Clock } from "lucide-react"; 
import { products } from "@/lib/products";
import { getBatches } from "@/services/batches/getBatches";
import { solveTSP} from "@/services/batches/tspService";
import { BatchTSPDeliveryDTO } from "@/services/batches/BatchTSPDeliveryDTO";
import { Batch } from "@/types/Batch";

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
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [distributionType, setDistributionType] = useState<
    "manual" | "automatico" | null
  >(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [currentDistributionType, setCurrentDistributionType] = useState(null);
  const [productDistributions, setProductDistributions] = useState({});
  const [batches, setBatches] = useState<Batch[]>([]);
  const [tspResult, setTspResult] = useState<BatchTSPDeliveryDTO | null>(null);
  const [tspLoading, setTspLoading] = useState(false);
  const [tspError, setTspError] = useState<string | null>(null);
  const [rows, setRows] = useState<
    {
      nombre: string;
      clasificacion: string;
      entrada: string;
      caducidad: string;
      prioridad: string;
    }[]
  >([]);

  const handleDistributionClick = (type: "manual" | "automatico" | null) => {
    setDistributionType(type);
  };

  const confirmarDistribucion = async () => {
    console.log(`Confirmando distribución ${distributionType}`);
    setCurrentDistributionType(distributionType);
    setDistributionType(null);
    
    if (distributionType === "automatico") {
      // Ejecutar TSP cuando se confirme distribución automática
      await ejecutarTSP();
    }
    
    setShowDownloadPopup(true);
  };

  const ejecutarTSP = async () => {
    if (!user || batches.length === 0) return;
    
    setTspLoading(true);
    setTspError(null);
    
    try {
      const token = await user.getIdToken();
      const result = await solveTSP(batches, token);
      setTspResult(result);
      console.log("TSP Result:", result);
    } catch (error: any) {
      console.error("Error al ejecutar TSP:", error);
      setTspError(error.message || "Error al procesar la distribución automática");
    } finally {
      setTspLoading(false);
    }
  };

  const descargarPDF = () => {
    if (currentDistributionType === "manual") {
      console.log("Generando distribución manual");
      console.log("Distribuciones:", productDistributions);
    } else {
      console.log("Descargando PDF de distribución automática");
      console.log("Resultado TSP:", tspResult);
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
    setProductDistributions({});
    setTspResult(null);
    setTspError(null);
  };

  // Close popup
  const cerrarPopup = () => {
    setDistributionType(null);
  };

  if (!user) return null;

  useEffect(() => {
    async function fetchBatches() {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const batchesData: Batch[] = await getBatches(token);
        setBatches(batchesData);

        const mappedRows = batchesData.map((batch) => ({
          nombre: batch.description,
          clasificacion: batch.classification?.name || "Sin clasificación",
          entrada: batch.entryDate,
          caducidad: batch.expirationDate,
          prioridad: batch.priority,
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error("Error al cargar batches:", error);
      }
    }

    fetchBatches();
  }, [user]);

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
            : "El sistema distribuirá los productos automáticamente usando el algoritmo TSP para optimizar las rutas."}
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

      {/* Distribution Assignment Popup */}
      <PopUpWindow
        open={showDownloadPopup}
        onClose={cerrarPopupDescarga}
        width="max-w-6xl"
      >
        <div className="max-w-none w-full max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {currentDistributionType === "manual" ? (
              <>
                <Package className="text-green-600" />
                Distribución Manual - Asignar Locaciones
              </>
            ) : (
              <>
                <MapPin className="text-blue-600" />
                Distribución Automática - Ruta Optimizada
              </>
            )}
          </h2>

          {/* TSP Loading State */}
          {currentDistributionType === "automatico" && tspLoading && (
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 font-semibold">
                  Calculando ruta óptima con algoritmo TSP...
                </span>
              </div>
            </div>
          )}

          {/* TSP Error State */}
          {currentDistributionType === "automatico" && tspError && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-red-800 font-semibold">
                  Error: {tspError}
                </span>
              </div>
            </div>
          )}

          {/* TSP Results Summary */}
          {currentDistributionType === "automatico" && tspResult && !tspLoading && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="text-blue-600" size={20} />
                  <span className="font-semibold text-blue-800">Locaciones</span>
                </div>
                <span className="text-2xl font-bold text-blue-900">
                  {tspResult.deliveryOrder?.length || 0}
                </span>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="text-green-600" size={20} />
                  <span className="font-semibold text-green-800">Batches</span>
                </div>
                <span className="text-2xl font-bold text-green-900">
                  {batches.length}
                </span>
              </div>
              
            </div>
          )}

          <p className="text-gray-600 mb-8 text-lg">
            {currentDistributionType === "manual"
              ? "Asigna manualmente una locación de destino para cada producto."
              : tspResult && !tspLoading
              ? "La distribución automática se ha completado. Los batches han sido asignados según la ruta más eficiente."
              : !tspLoading
              ? "Iniciando cálculo de distribución automática..."
              : ""}
          </p>

          {/* Products Distribution Table */}
          {currentDistributionType === "manual" && (
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
                      Asignar Destino
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TSP Results Table */}
  {currentDistributionType === "automatico" && tspResult && !tspLoading && (
    <div className="mb-8 overflow-x-auto shadow-lg rounded-lg border border-gray-200">
      <table className="w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
            <th className="border-b-2 border-blue-200 px-8 py-4 text-left font-bold text-blue-700 text-base">
              Orden de Entrega
            </th>
            <th className="border-b-2 border-blue-200 px-8 py-4 text-left font-bold text-blue-700 text-base">
              Batch
            </th>
            <th className="border-b-2 border-blue-200 px-8 py-4 text-left font-bold text-blue-700 text-base">
              Clasificación
            </th>
            <th className="border-b-2 border-blue-200 px-8 py-4 text-left font-bold text-blue-700 text-base">
              Destino Asignado
            </th>
            <th className="border-b-2 border-blue-200 px-8 py-4 text-left font-bold text-blue-700 text-base">
              Prioridad
            </th>
          </tr>
        </thead>
        <tbody>
          {tspResult.deliveryOrder?.map((batch, index) => {
            console.log(`Batch ID: ${batch.id}, Location:`, batch.location);

            return (
              <tr
                key={batch.id || index}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="border-b border-gray-100 px-8 py-5">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold text-sm">
                    {index + 1}
                  </span>
                </td>
                <td className="border-b border-gray-100 px-8 py-5 font-semibold text-gray-800">
                  {batch.description || batch.sku}
                </td>
                <td className="border-b border-gray-100 px-8 py-5">
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                    {batch.classification?.name || "Sin clasificación"}
                  </span>
                </td>
                <td className="border-b border-gray-100 px-8 py-5">
                  <div className="px-5 py-3 bg-green-50 border-2 border-green-200 rounded-lg">
                    <span className="text-green-800 font-semibold text-sm">
                      Ruta optimizada
                    </span>
                    <div className="text-sm text-green-600 mt-1 font-medium">
                      {batch.location?.postalCode}, {batch.location?.city}, {batch.location?.state}, {batch.location?.country}
                      
                    </div>
                  </div>
                </td>
                <td className="border-b border-gray-100 px-8 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      batch.priority === "Alta" || batch.priority === "HIGH"
                        ? "bg-red-100 text-red-800"
                        : batch.priority === "Media" || batch.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {batch.priority || "Normal"}
                  </span>
                </td>
              </tr>
            );
          }) || []}
        </tbody>
      </table>
    </div>
  )}

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
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                (currentDistributionType === "manual" &&
                Object.keys(productDistributions).length === 0) ||
                (currentDistributionType === "automatico" && (tspLoading || !tspResult))
              }
            >
              <Download size={20} />
              {currentDistributionType === "manual"
                ? "Generar Distribución"
                : tspLoading
                ? "Procesando..."
                : "Descargar PDF"}
            </motion.button>
          </div>
        </div>
      </PopUpWindow>
    </div>
  );
}