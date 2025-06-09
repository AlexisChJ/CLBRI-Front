"use client"

import { useState, useEffect } from "react"
import { deleteBatch } from "@/services/batches/deleteBatches";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion"
import { Trash2, Pencil } from "lucide-react"
import { AnimatePresence } from "framer-motion"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google"
import PopUpWindow from "@/components/PopUpWindow/PopupWindow" 

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

interface TablaAvanzadaProps {
  searchText: string;
  filterClasificacion: string;
  filterPrioridad: string;
  rows: {
    id: number;
    nombre: string;
    clasificacion: string;
    entrada: string;
    caducidad: string;
    prioridad: string;
  }[];
  setRows: React.Dispatch<React.SetStateAction<{
    id: number;
    nombre: string;
    clasificacion: string;
    entrada: string;
    caducidad: string;
    prioridad: string;
  }[]>>;
}

const TablaAvanzada = ({
  searchText,
  filterClasificacion,
  filterPrioridad,
  rows,
  setRows,
}: TablaAvanzadaProps) => {

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState({ nombre: "", clasificacion: "", entrada: "", caducidad: "", prioridad: "" })
  const [isDeleting, setIsDeleting] = useState(false) // Estado para loading
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const auth = getAuth();
  const user = auth.currentUser;
  const [firebaseToken, setFirebaseToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      if (user) {
        try {
          const token = await user.getIdToken(true); // Force refresh token
          setFirebaseToken(token);
        } catch (error) {
          console.error("Error getting Firebase token:", error);
        }
      }
    };
    getToken();
  }, [user]);

  // Filtros y búsqueda
  const filteredRows = rows.filter(row => {
    const matchesSearch = searchText === "all" || Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesClasificacion = filterClasificacion === "" || filterClasificacion === "all" || row.clasificacion === filterClasificacion
    const matchesPrioridad = filterPrioridad === "" || filterPrioridad === "all" || row.prioridad === filterPrioridad
    return matchesSearch && matchesClasificacion && matchesPrioridad
  })

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, filterClasificacion, filterPrioridad])

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = filteredRows.slice(startIndex, endIndex)

  // Get original index and batch data for edit/delete operations
  const getOriginalData = (filteredIndex: number) => {
    const item = currentPageData[filteredIndex]
    const originalIndex = rows.findIndex(row => row.id === item.id)
    return { originalIndex, batchData: item }
  }

  // Abrir popup edición y cargar fila
  const iniciarEdicion = (filteredIndex: number) => {
    const { originalIndex, batchData } = getOriginalData(filteredIndex)
    setEditIndex(originalIndex)
    setEditValues(batchData)
  }

  // Guardar edición en el estado
  const guardarEdicion = () => {
    if (editIndex !== null) {
      const newRows = [...rows]
      newRows[editIndex] = editValues
      setRows(newRows)
      setEditIndex(null)
    }
  }

  // Abrir popup para confirmar eliminación
  const iniciarEliminar = (filteredIndex: number) => {
    const { originalIndex } = getOriginalData(filteredIndex)
    setConfirmDeleteIndex(originalIndex)
  }

  // Eliminar fila confirmada
  const eliminarFila = async () => {
    if (confirmDeleteIndex === null || isDeleting) return;
    
    setIsDeleting(true);
    
    try {
      const batchToDelete = rows[confirmDeleteIndex];
      
      // Validar que tenemos el token
      if (!firebaseToken) {
        console.error("No Firebase token available");
        alert("Error: Token de autenticación no disponible");
        return;
      }
      
      // Validar que tenemos el ID
      if (!batchToDelete?.id) {
        console.error("No batch ID found:", batchToDelete);
        alert("Error: ID del batch no encontrado");
        return;
      }

      console.log("Eliminando batch con ID:", batchToDelete.id);
      console.log("Token disponible:", !!firebaseToken);
      
      // Llamar al API
      await deleteBatch(batchToDelete.id, firebaseToken);
      
      // Actualizar el estado solo si la eliminación fue exitosa
      setRows(prev => prev.filter((_, i) => i !== confirmDeleteIndex));
      setConfirmDeleteIndex(null);

      // Ajustar página si es necesario
      const newFilteredRows = rows.filter((_, i) => i !== confirmDeleteIndex).filter(row => {
        const matchesSearch = searchText === "all" || Object.values(row).some(val =>
          String(val).toLowerCase().includes(searchText.toLowerCase())
        );
        const matchesClasificacion = filterClasificacion === "" || filterClasificacion === "all" || row.clasificacion === filterClasificacion
        const matchesPrioridad = filterPrioridad === "" || filterPrioridad === "all" || row.prioridad === filterPrioridad
        return matchesSearch && matchesClasificacion && matchesPrioridad
      });
      
      const newTotalPages = Math.ceil(newFilteredRows.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }

      console.log("Batch eliminado exitosamente");
      
    } catch (error) {
      console.error("Error eliminando batch:", error);
      // Mostrar mensaje de error más específico
      if (error instanceof Error) {
        alert(`Error al eliminar: ${error.message}`);
      } else {
        alert("Error desconocido al eliminar el batch");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Pagination handlers
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = []
    const showPages = 5  
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let start = Math.max(1, currentPage - Math.floor(showPages / 2))
      let end = Math.min(totalPages, start + showPages - 1)
      
      if (end - start < showPages - 1) {
        start = Math.max(1, end - showPages + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      {/* Tabla */}
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className={`justify-center w-[25%] ${redHat.className} text-white`}>Nombre</TableHead>
              <TableHead className={`justify-center w-[15%] ${redHat.className} text-white`}>Clasificación</TableHead>
              <TableHead className={`justify-center w-[20%] ${redHat.className} text-white`}>Fecha de llegada</TableHead>
              <TableHead className={`justify-center w-[20%] ${redHat.className} text-white`}>Caducidad</TableHead>
              <TableHead className={`justify-center w-[15%] ${redHat.className} text-white`}>Prioridad</TableHead>
              <TableHead className={`justify-center w-[5%] ${redHat.className} text-white`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {currentPageData.map((row, index) => (
                <TableRow className={zenMaru.className} key={row.id || index}>
                  <TableCell className="whitespace-normal break-words">{row.nombre}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.clasificacion}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.entrada}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.caducidad}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.prioridad}</TableCell>
                  <TableCell className="flex justify-end items-center gap-4 pr-4">
                    <motion.button
                      onClick={() => iniciarEdicion(index)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.5 }}
                      className="text-black hover:text-[#3A70C3] transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => iniciarEliminar(index)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-black hover:text-[#E30004] transition-colors duration-200"
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </TableCell>
                </TableRow>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </Table>
      </div>

      {/* Functional Pagination */}
      {totalPages > 1 && (
        <Pagination className={`pb-4 ${redHat.className}`}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={goToPrevious}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {getPageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  onClick={() => goToPage(pageNum)}
                  className={`cursor-pointer ${
                    currentPage === pageNum 
                      ? "bg-[#3A70C3] text-white hover:bg-[#3A70C3] hover:text-white" 
                      : "hover:bg-blue-100"
                  } ${redHat.className}`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationNext 
                onClick={goToNext}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* PopUp Confirmación de Eliminación */}
      <PopUpWindow open={confirmDeleteIndex !== null} onClose={() => !isDeleting && setConfirmDeleteIndex(null)}>
        <h2 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar este elemento?</h2>
        {confirmDeleteIndex !== null && (
          <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
            {rows[confirmDeleteIndex]?.nombre}
            <br />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <motion.button
            onClick={() => setConfirmDeleteIndex(null)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            disabled={isDeleting}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={eliminarFila}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 disabled:opacity-50"
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </motion.button>
        </div>
      </PopUpWindow>

      <PopUpWindow open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <h2 className="text-lg font-bold mb-4">Editar Elemento</h2>
        <div className="space-y-3">
          {Object.keys(editValues).filter(key => key !== 'id').map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium capitalize">{key}</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={(editValues as any)[key]}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, [key]: e.target.value }))
                }
              />
            </div>
          ))}
          <div className="flex justify-end space-x-2 pt-2">
            <motion.button
              onClick={() => setEditIndex(null)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancelar
            </motion.button>
            <motion.button
              onClick={guardarEdicion}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Guardar
            </motion.button>
          </div>
        </div>
      </PopUpWindow>
    </div>
  )
}

export default TablaAvanzada