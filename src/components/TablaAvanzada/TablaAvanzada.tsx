"use client"

import { useState } from "react"
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
  searchText: string
  filterClasificacion: string
  filterPrioridad: string
}

const TablaAvanzada = ({
  searchText,
  filterClasificacion,
  filterPrioridad,
}: TablaAvanzadaProps) => {
  const [rows, setRows] = useState([
    { nombre: "Agua purificada", clasificacion: "Embotellado", entrada: "15-mayo-2025", caducidad: "15-mayo-2027", prioridad: "Baja" },
    { nombre: "Jugo de naranja", clasificacion: "Embotellado", entrada: "01-abril-2025", caducidad: "01-octubre-2025", prioridad: "Media" },
    { nombre: "Leche UHT", clasificacion: "Embotellado", entrada: "10-marzo-2025", caducidad: "10-septiembre-2025", prioridad: "Media" },
    { nombre: "Aceite de oliva", clasificacion: "Embotellado", entrada: "20-enero-2025", caducidad: "20-enero-2027", prioridad: "Baja" },
    { nombre: "Salsa de tomate", clasificacion: "Embotellado", entrada: "05-febrero-2025", caducidad: "05-febrero-2026", prioridad: "Media" },
    { nombre: "Atún enlatado", clasificacion: "Enlatado", entrada: "01-julio-2024", caducidad: "01-julio-2027", prioridad: "Media" },
    { nombre: "Maíz enlatado", clasificacion: "Enlatado", entrada: "10-junio-2024", caducidad: "10-junio-2027", prioridad: "Baja" },
    { nombre: "Frijoles refritos enlatados", clasificacion: "Enlatado", entrada: "25-marzo-2025", caducidad: "25-marzo-2028", prioridad: "Baja" },
    { nombre: "Sopa de champiñones enlatada", clasificacion: "Enlatado", entrada: "12-abril-2025", caducidad: "12-abril-2027", prioridad: "Media" },
    { nombre: "Duraznos en almíbar enlatados", clasificacion: "Enlatado", entrada: "18-enero-2025", caducidad: "18-enero-2028", prioridad: "Baja" },
    { nombre: "Manzanas", clasificacion: "Perecedero", entrada: "28-mayo-2025", caducidad: "11-junio-2025", prioridad: "Alta" },
    { nombre: "Pechuga de pollo", clasificacion: "Perecedero", entrada: "28-mayo-2025", caducidad: "31-mayo-2025", prioridad: "Alta" },
    { nombre: "Lechuga", clasificacion: "Perecedero", entrada: "28-mayo-2025", caducidad: "04-junio-2025", prioridad: "Alta" },
    { nombre: "Huevos", clasificacion: "Perecedero", entrada: "20-mayo-2025", caducidad: "20-junio-2025", prioridad: "Media" },
    { nombre: "Yogur", clasificacion: "Perecedero", entrada: "25-mayo-2025", caducidad: "08-junio-2025", prioridad: "Alta" },
    { nombre: "Pasta seca", clasificacion: "Otro", entrada: "01-enero-2025", caducidad: "01-enero-2028", prioridad: "Baja" },
    { nombre: "Arroz", clasificacion: "Otro", entrada: "10-febrero-2025", caducidad: "10-febrero-2029", prioridad: "Baja" },
    { nombre: "Azúcar", clasificacion: "Otro", entrada: "15-marzo-2025", caducidad: "Sin caducidad", prioridad: "Baja" },
    { nombre: "Café molido", clasificacion: "Otro", entrada: "20-abril-2025", caducidad: "20-octubre-2025", prioridad: "Media" },
    { nombre: "Galletas", clasificacion: "Otro", entrada: "05-mayo-2025", caducidad: "05-noviembre-2025", prioridad: "Media" }
]);

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState({ nombre: "", clasificacion: "", entrada: "", caducidad: "", prioridad: "" })
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Abrir popup edición y cargar fila
  const iniciarEdicion = (originalIndex: number) => {
    setEditIndex(originalIndex)
    setEditValues(rows[originalIndex])
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
  const iniciarEliminar = (originalIndex: number) => {
    setConfirmDeleteIndex(originalIndex)
  }

  // Eliminar fila confirmada
  const eliminarFila = () => {
    if (confirmDeleteIndex !== null) {
      setRows(prev => prev.filter((_, i) => i !== confirmDeleteIndex))
      setConfirmDeleteIndex(null)
      
      // Adjust current page if necessary after deletion
      const newTotalPages = Math.ceil((filteredRows.length - 1) / itemsPerPage)
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages)
      }
    }
  }

  // Filtros y búsqueda
  const filteredRows = rows.filter(row => {
    const matchesSearch = searchText === "all" || Object.values(row).some(val =>
      val.toLowerCase().includes(searchText.toLowerCase())
    )
    const matchesClasificacion = filterClasificacion === "" || filterClasificacion === "all" || row.clasificacion === filterClasificacion
    const matchesPrioridad = filterPrioridad === "" || filterPrioridad === "all" || row.prioridad === filterPrioridad
    return matchesSearch && matchesClasificacion && matchesPrioridad
  })

  // Reset current page when filters change
  useState(() => {
    setCurrentPage(1)
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = filteredRows.slice(startIndex, endIndex)

  // Get original indices for edit/delete operations
  const getOriginalIndex = (filteredIndex: number) => {
    const item = currentPageData[filteredIndex]
    return rows.findIndex(row => 
      row.nombre === item.nombre && 
      row.clasificacion === item.clasificacion && 
      row.entrada === item.entrada
    )
  }

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
          <TableCaption>
            Datos del Inventario de CLBRI - Página {currentPage} de {totalPages} 
            ({filteredRows.length} elementos total)
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-200 text-blue-800 hover:bg-blue-200">
              <TableHead className={`justify-center w-[17%] ${redHat.className}`}>Nombre</TableHead>
              <TableHead className={`justify-center w-[15%] ${redHat.className}`}>Clasificación</TableHead>
              <TableHead className={`justify-center w-[22%] ${redHat.className}`}>Fecha de llegada</TableHead>
              <TableHead className={`justify-center w-[22%] ${redHat.className}`}>Caducidad</TableHead>
              <TableHead className={`justify-center w-[16%] ${redHat.className}`}>Prioridad</TableHead>
              <TableHead className={`justify-center w-[8%] ${redHat.className}`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <AnimatePresence mode="wait">
            <motion.tbody
              key={currentPage} // Para que se reanime al cambiar de página
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {currentPageData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-normal break-words">{row.nombre}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.clasificacion}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.entrada}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.caducidad}</TableCell>
                  <TableCell className="whitespace-normal break-words">{row.prioridad}</TableCell>
                  <TableCell className="flex justify-end items-center gap-4 pr-4">
                    <motion.button
                      onClick={() => iniciarEdicion(getOriginalIndex(index))}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => iniciarEliminar(getOriginalIndex(index))}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-red-600 hover:text-red-800 transition duration-200"
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
        <Pagination className={"pb-4 ${redHat.className}"}>
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
                      ? "bg-blue-200 text-white hover:blue-100" 
                      : "hover:bg-blue-50"
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
      <PopUpWindow open={confirmDeleteIndex !== null} onClose={() => setConfirmDeleteIndex(null)}>
        <h2 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar este elemento?</h2>
        <div className="flex justify-end space-x-2">
          <motion.button
            onClick={() => setConfirmDeleteIndex(null)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={eliminarFila}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          >
            Eliminar
          </motion.button>
        </div>
      </PopUpWindow>

      <PopUpWindow open={editIndex !== null} onClose={() => setEditIndex(null)}>
        <h2 className="text-lg font-bold mb-4">Editar Elemento</h2>
        <div className="space-y-3">
          {Object.keys(editValues).map((key) => (
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