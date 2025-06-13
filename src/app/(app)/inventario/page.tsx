"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import { Prompt } from "next/font/google";
import { useAuth } from "@/providers/AuthProvider";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Buttons from "@/components/Buttons/Buttons";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { TextInput } from "@/components/TextInput/TextInput";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { getBatches} from "@/services/batches/getBatches";
import { Batch } from "@/types/Batch";
import { addBatch } from "@/services/batches/addBatch";
import { Classification } from "@/types/Classification";
import { getClassifications } from "@/services/classifications/getClassifications";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function SitioTabla() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [agregarDescripcion, setAgregarDescripcion] = useState("");
  const [agregarClasificacion, setAgregarClasificacion] = useState(-1);
  const [agregarPrioridad, setAgregarPrioridad] = useState("");
  const [agregarFechaEntrega, setAgregarFechaEntrega] = useState<Date | undefined>(undefined);
  const [agregarFechaExpiracion, setAgregarFechaExpiracion] = useState<Date | undefined>(undefined);

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

  const [classifications, setClassifications] = useState<Classification[]>([]);

  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    async function fetchBatches() {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const batches: Batch[] = await getBatches(token);
        const classifications_data: Classification[] = await getClassifications(token);

        const mappedRows = batches.map((batch) => ({
          id: batch.id, 
          nombre: batch.description,
          clasificacion: batch.classification?.name || "Sin clasificación",
          entrada: format(parseISO(batch.entryDate), "dd-MMMM-yyyy", { locale: es }),
          caducidad: format(parseISO(batch.expirationDate), "dd-MMMM-yyyy", { locale: es }),
          prioridad: batch.priority,
        }));

        setClassifications(classifications_data);
        setRows(mappedRows);
      } catch (error) {
        console.error("Error cargando batches:", error);
      }
    }

    fetchBatches();
  }, [user]);

  if (!user) return null;

  const agregarProducto = async () => {
    if (
      !agregarDescripcion ||
      !agregarClasificacion ||
      !agregarFechaEntrega ||
      !agregarFechaExpiracion ||
      !agregarPrioridad
    ) {
      alert("Por favor llena todos los campos");
      return;
    }

    if (!user) return;
    const token = await user.getIdToken();

    try {
      if (agregarClasificacion === -1) throw Error("Invalid classification");
      const addedBatch = await addBatch(
        {
          sku: "10001A",
          description: agregarDescripcion,
          entryDate: format(agregarFechaEntrega, "yyyy-MM-dd"),
          expirationDate: format(agregarFechaExpiracion, "yyyy-MM-dd"),
          priority: agregarPrioridad,
          location_id: 1, 
          classification_id: agregarClasificacion, 
        },
        token
      );

      setRows([...rows, { 
        id: addedBatch.id,
        nombre: addedBatch.description,
        clasificacion: classifications[addedBatch.classification?.id ?? 0].name,
        entrada: format(new Date(addedBatch.entryDate), 'dd-MMMM-yyyy', { locale: es }),
        caducidad: format(new Date(addedBatch.expirationDate), 'dd-MMMM-yyyy', { locale: es }),
        prioridad: addedBatch.priority
       }])
      setPopupOpen(false);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("Error al agregar producto");
    }
  };

  return (
    // No height??
    <div className="flex flex-col p-5 gap-5 overflow-y-auto">
      <NavBar
        title="Inventario"
        opts={[]}
        selected={0}
        onValueChange={() => {}}
        center={
          <div
            className={`flex gap-6 text-lg font-semibold ${prompt.className}`}
          ></div>
        }
      />
      <div className="flex flex-row gap-5">
        <div className="w-full">
          <SearchBar
            searchText={searchText}
            onSearchTextChange={setSearchText}
            filterClasificacion={filterClasificacion}
            onFilterClasificacionChange={setFilterClasificacion}
            filterPrioridad={filterPrioridad}
            onFilterPrioridadChange={setFilterPrioridad}
          />
        </div>
        <Buttons
          text="+"
          color="login"
          className="w-auto px-6"
          buttonSize="default"
          onClick={() => setPopupOpen(true)}
        />
      </div>
      <TablaAvanzada
        searchText={searchText}
        clasificaciones={classifications}
        filterClasificacion={filterClasificacion}
        filterPrioridad={filterPrioridad}
        rows={rows}
        setRows={setRows}
      />

      <PopUpWindow open={popupOpen} onClose={() => setPopupOpen(false)}>
        <div className="m-5 flex flex-col gap-4">
          <h3
            className={`${prompt.className} text-[#3A70C3] text-center text-4xl mb-4`}
          >
            Agregar Producto
          </h3>

          {/* Nombre */}
          <TextInput
            placeholder="Nombre del producto"
            value={agregarDescripcion}
            onChange={(e) => setAgregarDescripcion(e.target.value)}
          />

          {/* Clasificación */}
          <select
            className="w-full border rounded p-2 bg-[#E9EBEA] text-[#5B5B5B]"
            value={agregarClasificacion}
            onChange={(e) => setAgregarClasificacion(Number(e.target.value))}
          >
            <option value={-1}>Selecciona una clasificación</option>
            {
              classifications.map((e, i) => (
                <option value={e.id} key={i}>{e.name}</option>
              ))
            }
          </select>

          {/* Fecha de llegada */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Fecha de llegada
            </label>
            <DatePicker
              date={agregarFechaEntrega}
              onDateChange={setAgregarFechaEntrega}
            />
          </div>

          {/* Fecha de caducidad */}
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Fecha de caducidad
            </label>
            <DatePicker
              date={agregarFechaExpiracion}
              onDateChange={setAgregarFechaExpiracion}
            />
          </div>

          {/* Prioridad */}
          <select
            className="w-full border rounded p-2 bg-[#E9EBEA] text-[#5B5B5B]"
            value={agregarPrioridad}
            onChange={(e) => setAgregarPrioridad(e.target.value)}
          >
            <option value="">Selecciona una prioridad</option>
            <option value="HIGH">Alta</option>
            <option value="MID">Media</option>
            <option value="LOW">Baja</option>
          </select>

          {/* Botón de guardar */}
          <button
            onClick={agregarProducto}
            className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
          >
            Guardar
          </button>
        </div>
      </PopUpWindow>
    </div>
  );
}