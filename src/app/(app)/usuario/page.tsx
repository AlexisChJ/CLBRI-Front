"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { NavBar } from "@/components/NavBar/NavBar";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { Prompt } from "next/font/google";
import { useAuth } from "@/providers/AuthProvider";
import TablaMerma from "@/components/TablaMerma/TablaMerma";
import Buttons from "@/components/Buttons/Buttons";
import { getBatches } from "@/services/batches/getBatches"; 
import { Batch } from "@/types/Batch"; 

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function SitioTabla() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [filterClasificacion, setFilterClasificacion] = useState("");
  const [filterPrioridad, setFilterPrioridad] = useState("");
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    async function fetchBatches() {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null); 

      try {
        const token = await user.getIdToken();
        const fetchedBatches = await getBatches(token);
        setBatches(fetchedBatches);
      } catch (err: any) {
        console.error("Error al cargar los batches:", err);
        setError(err.message || "Error al cargar los batches.");
      } finally {
        setLoading(false);
      }
    }

    fetchBatches();
  }, [user]); 

  if (!user) return null; 
  if (loading) {
    return (
      <div className="flex flex-col p-5 gap-5 overflow-y-auto h-full items-center justify-center">
        <p className={`${prompt.className} text-xl text-gray-700`}>Cargando batches...</p>
        {/* You can add a spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col p-5 gap-5 overflow-y-auto h-full items-center justify-center text-red-600">
        <p className={`${prompt.className} text-xl`}>Error: {error}</p>
        <p className="text-gray-600">Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col p-5 gap-5 overflow-y-auto h-full">
      <NavBar
        title="Usuario"
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
        <div className="w-4/5">
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
          text="Guardar"
          color="register"
          className="w-1/5 px-6"
          buttonSize="default"
          // onClick={} 
        />
      </div>
      <TablaMerma
        searchText={searchText}
        filterClasificacion={filterClasificacion}
        filterPrioridad={filterPrioridad}
        batches={batches}
      />
    </div>
  );
}