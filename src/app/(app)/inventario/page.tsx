"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import TablaAvanzada from "@/components/TablaAvanzada/TablaAvanzada";
import { Prompt } from "next/font/google";
import { Notification } from "@/types/Notification";
import { useAuth } from "@/providers/AuthProvider";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import Buttons from "@/components/Buttons/Buttons";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { TextInput } from "@/components/TextInput/TextInput";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import { products } from "@/lib/products";
import { getBatches} from "@/services/batches/getBatches";
import { Batch } from "@/types/Batch";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function SitioTabla() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [agregarDescripcion, setAgregarDescripcion] = useState("");
  const [agregarClasificacion, setAgregarClasificacion] = useState("");
  const [agregarPrioridad, setAgregarPrioridad] = useState("");
  const [agregarFechaEntrega, setAgregarFechaEntrega] = useState<Date | undefined>(undefined);
  const [agregarFechaExpiracion, setAgregarFechaExpiracion] = useState<Date | undefined>(undefined);

  // ✅ AGREGAR EL ID AL TIPO
  const [rows, setRows] = useState<
    {
      id: number; // ✅ Agregar el ID aquí
      nombre: string;
      clasificacion: string;
      entrada: string;
      caducidad: string;
      prioridad: string;
    }[]
  >([]);

  const [popupOpen, setPopupOpen] = useState(false);

  const notificaciones: Notification[] = [{ description: "S" }];

  useEffect(() => {
    async function fetchBatches() {
      if (!user) return;
      try {
        const token = await user.getIdToken();
        const batches: Batch[] = await getBatches(token);

        // ✅ INCLUIR EL ID EN EL MAPEO
        const mappedRows = batches.map((batch) => ({
          id: batch.id, // ✅ INCLUIR EL ID DEL BATCH ORIGINAL
          nombre: batch.description,
          clasificacion: batch.classification?.name || "Sin clasificación",
          entrada: format(parseISO(batch.entryDate), "dd-MMMM-yyyy", { locale: es }),
          caducidad: format(parseISO(batch.expirationDate), "dd-MMMM-yyyy", { locale: es }),
          prioridad: batch.priority,
        }));

        setRows(mappedRows);
      } catch (error) {
        console.error("Error cargando batches:", error);
      }
    }

    fetchBatches();
  }, [user]);

  if (!user) return null;

  const agregarProducto = () => {
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

    // ✅ NOTA: Los productos agregados localmente no tendrán ID real
    // hasta que se guarden en el servidor
    const nuevoProducto = {
      id: Date.now(), // ✅ ID temporal para productos nuevos
      nombre: agregarDescripcion,
      clasificacion: agregarClasificacion,
      entrada: format(agregarFechaEntrega, "dd-MMMM-yyyy", { locale: es }),
      caducidad: format(agregarFechaExpiracion, "dd-MMMM-yyyy", { locale: es }),
      prioridad: agregarPrioridad,
    };

    setRows((prev) => [...prev, nuevoProducto]);

    // Limpiar y cerrar
    setAgregarDescripcion("");
    setAgregarClasificacion("");
    setAgregarFechaEntrega(undefined);
    setAgregarFechaExpiracion(undefined);
    setAgregarPrioridad("");
    setPopupOpen(false);
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
            onChange={(e) => setAgregarClasificacion(e.target.value)}
          >
            <option value="">Selecciona una clasificación</option>
            <option value="Enbotellado">Enbotellado</option>
            <option value="Enlatado">Enlatado</option>
            <option value="Perecederos">Perecederos</option>
            <option value="Otros">Otros</option>
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