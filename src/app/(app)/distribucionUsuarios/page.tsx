"use client";

import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import LocationsMap from "@/components/Mapa/mapa";
import { useState, useEffect } from "react";
import Buttons from "@/components/Buttons/Buttons";
import { useAuth } from "@/providers/AuthProvider";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { motion } from "framer-motion";
import { Download, ChevronDown, Package } from "lucide-react";
import { solveTSP} from "@/services/batches/tspService";
import { sendManualDistribution } from "@/services/batches/manualDistributionService";
import { BatchTSPDeliveryDTO } from "@/services/batches/BatchTSPDeliveryDTO";
import { Batch } from "@/types/Batch";
import { DistributionItem } from "@/types/Manual";
import { Order } from "@/types/Order";
import { UserLocation } from "@/types/UserLocation"; 
import { useAppSession } from "@/providers/AppSessionProvider";
// import { getAvailableBatches } from "@/services/batches/getAvailableBatches";
import { getBatches } from "@/services/batches/getBatches";


export default function VistaMapa() {
  const { user } = useAuth();
  const { fetchedUserLocations } = useAppSession();

  const [searchText, setSearchText] = useState("");
  const [clasificaciones] = useState([]);
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");

  const [showManualAssignmentPopup, setShowManualAssignmentPopup] = useState(false);
  const [distributionType, setDistributionType] = useState<
    "manual" | "automatico" | null
  >(null);
  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const [currentDistributionType, setCurrentDistributionType] = useState<
    "manual" | "automatico" | null
  >(null);
  const [productDistributions, setProductDistributions] = useState<
    Record<string, string>
  >({});
  const [batches, setBatches] = useState<Batch[]>([]);
  const [tspResult, setTspResult] = useState<BatchTSPDeliveryDTO | null>(null);
  const [tspLoading, setTspLoading] = useState(false);
  const [tspError, setTspError] = useState<string | null>(null);

  const [manualDistributionLoading, setManualDistributionLoading] = useState(false);
  const [manualDistributionError, setManualDistributionError] = useState<string | null>(null);
  const [manualDistributionOrders, setManualDistributionOrders] = useState<Order[] | null>(null);
  
  // **NUEVO ESTADO: Para almacenar las ubicaciones de los usuarios**
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);
  const [] = useState<
    { lat: number; lng: number; title: string }[]
  >([]);


  const [rows, setRows] = useState<
    {
      id: number;
      nombre: string;
      clasificacion: string;
      entrada: string;
      caducidad: string;
      prioridad: string;
    }[]
  >([]);

  const handleDistributionClick = (type: "manual" | "automatico") => {
    if (type === "manual") {
      setShowManualAssignmentPopup(true); 
      setCurrentDistributionType("manual"); 
    } else {
      setDistributionType(type); 
    }
  };
  
  const confirmarDistribucionInicial = async () => { 
    console.log(`Confirmando distribución ${distributionType}`); 
    setCurrentDistributionType(distributionType); 
    setDistributionType(null);

    if (distributionType === "automatico") { 
        await ejecutarTSP();
        setShowDownloadPopup(true);
    }
  };

  const ejecutarTSP = async () => {
    if (!user || batches.length === 0) return;

    setTspLoading(true);
    setTspError(tspError);
    setTspError(null);

    try {
      const token = await user.getIdToken();
      const result = await solveTSP(batches, token);
      setTspResult(result);
      console.log("TSP Result:", result);
// eslint-disable-next-line react-hooks/exhaustive-deps
    } catch (error: unknown) {
      console.error("Error al ejecutar TSP:", error);
      setTspError(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Error al procesar la distribución automática"
      );
    } finally {
      setTspLoading(false);
    }
  };

  const ejecutarManualDistribution = async () => {
    if (!user) {
      console.error("Usuario no autenticado para distribución manual.");
      return;
    }

    setManualDistributionLoading(true);
    setManualDistributionError(null);
    setManualDistributionOrders(null);

    console.log("1. productDistributions actual (before sending):", productDistributions);

    const distributions: DistributionItem[] = Object.entries(productDistributions)
      .map(([batchId, locationId]) => ({
        batchId: Number(batchId),
        receivedByUserId: Number(locationId),
      }));

    console.log("2. Array 'distributions' a enviar:", distributions);

    // This check is now more relevant here, after selections are made
    if (distributions.length === 0) {
      setManualDistributionError("No hay productos asignados para distribución manual.");
      setManualDistributionLoading(false);
      return;
    }

    try {
      const token = await user.getIdToken();
      const resultOrders = await sendManualDistribution(
        distributions,
        token
      );
      setManualDistributionOrders(resultOrders);
      console.log("Resultado de distribución manual (Órdenes creadas):", resultOrders);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    } catch (error: unknown) {
      console.error("Error al ejecutar distribución manual:", error);
      setManualDistributionError(
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "Error al procesar la distribución manual"
      );
    } finally {
      setManualDistributionLoading(false);
    }
  };

  const handleLocationAssignment = (batchId: string, locationId: string) => {
    console.log(`3. Asignando Batch ID: ${batchId} a Location ID: ${locationId}`);

    setProductDistributions((prev) => {
        const newState = {
            ...prev,
            [batchId]: locationId,
        };
        console.log("4. Nuevo estado de productDistributions después de la asignación:", newState);
        return newState;
    });
  };

  const cerrarPopupDescarga = () => { 
    setShowDownloadPopup(false);
    setCurrentDistributionType(null);
    setProductDistributions({}); 
    setTspResult(null);
    setTspError(null);
    setManualDistributionOrders(null);
    setManualDistributionError(null);
    setShowManualAssignmentPopup(false);
  };

  const cerrarInitialPopup = () => {
    setDistributionType(null);
  };

  const cerrarManualAssignmentPopup = () => {
    setShowManualAssignmentPopup(false);
    setProductDistributions({}); 
    setManualDistributionError(null);
  };

  const batchesWithAssignedLocations = batches.map(batch => {
    const assignedLocationId = productDistributions[batch.id];
    let assignedLocation: UserLocation | undefined;

    if (assignedLocationId) {
      assignedLocation = userLocations.find(loc => String(loc.id) === String(assignedLocationId));
    }

    return {
      ...batch,
      assignedLocation: assignedLocation 
    };
  });

  useEffect(() => {
    async function fetchBatchesAndLocations() {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        
        const batchesData: Batch[] = await getBatches(token);
        setBatches(batchesData);
        const mappedRows = batchesData.map((batch) => ({
          id: typeof batch.id === "number" ? batch.id : Number(batch.id), 
          nombre: batch.description,
          clasificacion: batch.classification?.name || "Sin clasificación",
          entrada: batch.entryDate,
          caducidad: batch.expirationDate,
          prioridad: batch.priority,
        }));
        setRows(mappedRows);
        console.log("5. Batches cargados y mapeados para la tabla:", batchesData);

        setUserLocations(fetchedUserLocations); 
        console.log("6. Transformed User Locations cargadas:", fetchedUserLocations);

      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    fetchBatchesAndLocations();
}, [user]);

  useEffect(() => {
    setUserLocations(fetchedUserLocations);
    console.log("Corre...")
  }, [fetchedUserLocations]); 

  if (!user) {
      return <div>Loading user information or please log in...</div>;
  }
  return (
    <div id="tesss" className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <NavBar
        title="Distribución"
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
            clasificaciones={clasificaciones}
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

      {/* This popup is for the initial confirmation of automatic distribution */}
      <PopUpWindow open={distributionType !== null} onClose={cerrarInitialPopup}>
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
            onClick={cerrarInitialPopup}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={confirmarDistribucionInicial} 
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
      {/* Manual assignment */}
      <PopUpWindow
        open={showManualAssignmentPopup} 
        onClose={cerrarManualAssignmentPopup} 
        width="max-w-6xl"
      >
        <div className="max-w-none w-full max-h-[90vh] overflow-auto">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="text-green-600" />
            Distribución Manual - Asignar Locaciones
          </h2>

          {manualDistributionLoading && (
            <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-600"></div>
                <span className="text-yellow-800 font-semibold">
                  Procesando distribución manual...
                </span>
              </div>
            </div>
          )}

          {manualDistributionError && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-red-800 font-semibold">
                  Error: {manualDistributionError}
                </span>
              </div>
            </div>
          )}

          <p className="text-gray-600 mb-8 text-lg">
            Asigna manualmente una locación de destino para cada Batch.
          </p>

          <div className="mb-8 overflow-x-auto shadow-lg rounded-lg border border-gray-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="border-b-2 border-gray-200 px-8 py-4 text-left font-bold text-gray-700 text-base">
                    Batch SKU / Descripción
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
                {batchesWithAssignedLocations.map((batch) => (
                  <tr
                    key={batch.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="border-b border-gray-100 px-8 py-5 font-semibold text-gray-800">
                      {batch.description || batch.sku || "N/A"}
                    </td>
                    <td className="border-b border-gray-100 px-8 py-5">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {batch.classification?.name || "Sin clasificación"}
                      </span>
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
                        {batch.priority}
                      </span>
                    </td>
                    <td className="border-b border-gray-100 px-8 py-5">
                      {batch.assignedLocation ? ( // This is where the display logic occurs
                        <div className="px-5 py-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                          <span className="text-blue-800 font-semibold text-sm">
                            Asignado:
                          </span>
                          <div className="text-sm text-blue-600 mt-1 font-medium">
                            {/* Ensure all properties are accessed safely */}
                            {batch.assignedLocation.nombre} | {batch.assignedLocation.city || 'N/A'}, {batch.assignedLocation.state || 'N/A'}, {batch.assignedLocation.country || 'N/A'} ({batch.assignedLocation.postalCode || 'N/A'})
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <select
                            value={productDistributions[batch.id] || ""}
                            onChange={(e) =>
                              handleLocationAssignment(batch.id + "", e.target.value)
                            }
                            className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-sm font-medium transition-all duration-200 hover:border-gray-400"
                          >
                            <option value="">Seleccionar destino...</option>
                            {userLocations.map((location) => (
                              <option key={location.id} value={location.id}>
                                {location.nombre} | {location.city}, {location.state}, {location.country} ({location.postalCode})
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={20}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                          />
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
              onClick={cerrarManualAssignmentPopup}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="px-8 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-200 font-semibold text-gray-700"
            >
              Cancelar
            </motion.button>
            <motion.button
              onClick={() => {
                ejecutarManualDistribution(); 
                setShowDownloadPopup(true);
                setShowManualAssignmentPopup(false); 
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center gap-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={manualDistributionLoading || Object.keys(productDistributions).length === 0}
            >
              <Download size={20} />
              {manualDistributionLoading ? "Enviando..." : "Generar Distribución"}
            </motion.button>
          </div>
        </div>
      </PopUpWindow>


      <PopUpWindow
        open={showDownloadPopup && currentDistributionType !== null} 
        onClose={cerrarPopupDescarga}
        width="max-w-6xl"
      >
        <div className="max-w-none w-full max-h-[90vh] overflow-auto">
        {currentDistributionType === "manual" && manualDistributionOrders && !manualDistributionLoading && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold mb-2">
                ✅ Distribución manual completada. Se han creado {manualDistributionOrders.length} órdenes:
              </p>
              <ul className="list-disc list-inside text-sm text-green-700">
                {manualDistributionOrders.slice(0, 5).map(order => (
                  <li key={order.id}>Orden ID: {order.id}</li>
                ))}
                {manualDistributionOrders.length > 5 && <li>...y {manualDistributionOrders.length - 5} más.</li>}
              </ul>
            </div>
          )}
        
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
                          {batch.description || batch.sku || "N/A"} {/* Added N/A fallback */}
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
                              {/* Ensure batch.location and its properties exist */}
                              {batch.location?.postalCode}, {batch.location?.city}, {batch.location?.state}, {batch.location?.country}
                              {!batch.location && "Ubicación no disponible"} {/* Fallback if location is null */}
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
            
          </div>
        </div>
      </PopUpWindow>
    </div>
  );
}