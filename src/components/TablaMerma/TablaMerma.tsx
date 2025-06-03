"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google"

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

interface TablaMermaProps {
  searchText: string
  filterClasificacion: string
  filterPrioridad: string
}

const TablaMerma = ({ searchText, filterClasificacion, filterPrioridad }: TablaMermaProps) => {
  const [rows] = useState([
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
  ])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const filteredRows = rows.filter(row => {
    const matchesSearch = searchText === "all" || Object.values(row).some(val =>
      val.toLowerCase().includes(searchText.toLowerCase())
    )
    const matchesClasificacion = filterClasificacion === "" || filterClasificacion === "all" || row.clasificacion === filterClasificacion
    const matchesPrioridad = filterPrioridad === "" || filterPrioridad === "all" || row.prioridad === filterPrioridad
    return matchesSearch && matchesClasificacion && matchesPrioridad
  })

  const totalPages = Math.ceil(filteredRows.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPageData = filteredRows.slice(startIndex, startIndex + itemsPerPage)

  const toggleSelection = (nombre: string) => {
    setSelectedItems(prev =>
      prev.includes(nombre)
        ? prev.filter(item => item !== nombre)
        : [...prev, nombre]
    )
  }

  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className="w-[5%] text-white"></TableHead>
              <TableHead className={`w-[25%] ${redHat.className} text-white`}>Nombre</TableHead>
              <TableHead className={`w-[15%] ${redHat.className} text-white`}>Clasificación</TableHead>
              <TableHead className={`w-[20%] ${redHat.className} text-white`}>Fecha de llegada</TableHead>
              <TableHead className={`w-[20%] ${redHat.className} text-white`}>Caducidad</TableHead>
              <TableHead className={`w-[15%] ${redHat.className} text-white`}>Prioridad</TableHead>
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
                <TableRow key={index} className={zenMaru.className}>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(row.nombre)}
                      onChange={() => toggleSelection(row.nombre)}
                    />
                  </TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.clasificacion}</TableCell>
                  <TableCell>{row.entrada}</TableCell>
                  <TableCell>{row.caducidad}</TableCell>
                  <TableCell>{row.prioridad}</TableCell>
                </TableRow>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination className="pb-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  className={`cursor-pointer ${
                    currentPage === page
                      ? "bg-[#3A70C3] text-white hover:bg-[#3A70C3]"
                      : "hover:bg-blue-100"
                  } ${redHat.className}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

export default TablaMerma
