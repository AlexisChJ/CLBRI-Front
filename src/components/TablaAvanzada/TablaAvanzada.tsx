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
    { nombre: "PH", clasificacion: "PH", entrada: "19-mayo-2023", caducidad: "19-mayo-2026", prioridad: "Alta" },
    { nombre: "NaCl", clasificacion: "Sal", entrada: "19-julio-2024", caducidad: "19-mayo-2027", prioridad: "Media" }
  ])

  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState<number | null>(null)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState({ nombre: "", clasificacion: "", entrada: "", caducidad: "", prioridad: "" })

  // Abrir popup edición y cargar fila
  const iniciarEdicion = (index: number) => {
    setEditIndex(index)
    setEditValues(rows[index])
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
  const iniciarEliminar = (index: number) => {
    setConfirmDeleteIndex(index)
  }

  // Eliminar fila confirmada
  const eliminarFila = () => {
    if (confirmDeleteIndex !== null) {
      setRows(prev => prev.filter((_, i) => i !== confirmDeleteIndex))
      setConfirmDeleteIndex(null)
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

  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      {/* Tabla */}
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableCaption>Datos del Inventario de CLBRI</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-200 text-blue-800 hover:bg-blue-200">
              <TableHead className={`justify-center w-[15%] ${redHat.className}`}>Nombre</TableHead>
              <TableHead className={redHat.className}>Clasificación</TableHead>
              <TableHead className={redHat.className}>Fecha de llegada</TableHead>
              <TableHead className={redHat.className}>Caducidad</TableHead>
              <TableHead className={redHat.className}>Prioridad</TableHead>
              <TableHead className={`justify-center w-[7%] ${redHat.className}`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRows.map((fila, index) => (
              <TableRow key={fila.nombre + index} className={zenMaru.className}>
                <TableCell>{fila.nombre}</TableCell>
                <TableCell>{fila.clasificacion}</TableCell>
                <TableCell>{fila.entrada}</TableCell>
                <TableCell>{fila.caducidad}</TableCell>
                <TableCell>{fila.prioridad}</TableCell>
                <TableCell className="flex justify-end items-center gap-4 pr-4">
                  <motion.button
                    onClick={() => iniciarEdicion(index)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.3 }}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                    aria-label="Editar fila"
                  >
                    <Pencil className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => iniciarEliminar(index)}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.3 }}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                    aria-label="Eliminar fila"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación (sin funcionalidad, solo UI) */}
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

      {/* PopUp Confirmación de Eliminación */}
      <PopUpWindow open={confirmDeleteIndex !== null} onClose={() => setConfirmDeleteIndex(null)}>
        <h2 className="text-lg font-bold mb-4">¿Estás seguro de que deseas eliminar este elemento?</h2>
        <div className="flex justify-end space-x-2">
          <button onClick={() => setConfirmDeleteIndex(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancelar
          </button>
          <button onClick={eliminarFila} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </PopUpWindow>

      {/* PopUp Edición */}
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
            <button onClick={() => setEditIndex(null)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancelar
            </button>
            <button onClick={guardarEdicion} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </div>
      </PopUpWindow>
    </div>
  )
}

export default TablaAvanzada
