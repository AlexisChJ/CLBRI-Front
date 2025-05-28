"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trash2, Pencil } from "lucide-react"

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

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

const TablaAvanzada = () => {
  const [rows, setRows] = useState([
    { nombre: "PH", clasificacion: "PH", entrada: "19-mayo-2023", caducidad: "19-mayo-2026" , prioridad : "Alta" },
    { nombre: "NaCl", clasificacion: "Sal", entrada: "19-julio-2024", caducidad: "19-mayo-2027", prioridad: "Media" }
  ])

  const eliminarFila = (index: number) => {
    setRows(prev => prev.filter((_, i) => i !== index))
  }

  const editarFila = (index: number) => {
    alert(`Editar fila ${index + 1}`)
  }

  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableCaption>Datos del Inventario de CLBRI</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-200 text-blue-800 hover:bg-blue-200">
              <TableHead className={`w-[200px] ${redHat.className}`}>Nombre</TableHead>
              <TableHead className={redHat.className}>Clasificación</TableHead>
              <TableHead className={redHat.className}>Fecha de llegada</TableHead>
              <TableHead className={redHat.className}>Caducidad</TableHead>
              <TableHead className={redHat.className}>Prioridad</TableHead>
              <TableHead className={`justify-center w-[7%] ${redHat.className}`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((fila, index) => (
              <TableRow key={fila.nombre + index} className={zenMaru.className}>
                <TableCell>{fila.nombre}</TableCell>
                <TableCell>{fila.clasificacion}</TableCell>
                <TableCell>{fila.entrada}</TableCell>
                <TableCell>{fila.caducidad}</TableCell>
                <TableCell>{fila.prioridad}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-4">
                    <motion.button
                      onClick={() => editarFila(index)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-blue-600 hover:text-blue-800 transition duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => eliminarFila(index)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-red-600 hover:text-red-800 transition duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="pb-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
            <PaginationLink href="#">2</PaginationLink>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TablaAvanzada
