"use client"
import PopUpWindow from "@/components/PopUpWindow/PopupWindow"
import { useState } from "react"
import { motion } from "framer-motion"
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
import { Trash2, Pencil } from "lucide-react"

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

type Usuario = {
  id: string;
  lugarTrabajo: string;
  nombre?: string;
};

const TablaUsuarios = ({ usuarios }: { usuarios: Usuario[] }) => {
  const [usuariosList, setUsuariosList] = useState<Usuario[]>(usuarios)
  const [popupEditOpen, setPopupEditOpen] = useState(false)
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null)
  const [editLugarTrabajo, setEditLugarTrabajo] = useState("")

  const handleEliminar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuariosList]
      nuevaLista.splice(selectedUserIndex, 1)
      setUsuariosList(nuevaLista)
      setPopupDeleteOpen(false)
    }
  }

  const handleEditar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuariosList]
      nuevaLista[selectedUserIndex].lugarTrabajo = editLugarTrabajo
      setUsuariosList(nuevaLista)
      setPopupEditOpen(false)
    }
  }

  return (
    <div className="flex flex-col space-y-2 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableCaption>Lista de Usuarios de CLBRI</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-200 text-blue-800 hover:bg-blue-200">
              <TableHead className={`w-[100px] ${redHat.className}`}>ID</TableHead>
              <TableHead className={redHat.className}>Lugar de trabajo</TableHead>
              <TableHead className={`w-[80px] text-right ${redHat.className}`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuariosList.map((usuario, idx) => (
              <TableRow className={zenMaru.className} key={idx}>
                <TableCell className="font-medium">{usuario.id}</TableCell>
                <TableCell>{usuario.lugarTrabajo}</TableCell>
                <TableCell className="flex justify-end items-center gap-4 pr-4">
                  <motion.button
                    onClick={() => {
                      setSelectedUserIndex(idx)
                      setEditLugarTrabajo(usuario.lugarTrabajo)
                      setPopupEditOpen(true)
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.3 }}
                    className="text-blue-600 hover:text-blue-800 transition duration-200"
                  >
                    <Pencil className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      setSelectedUserIndex(idx)
                      setPopupDeleteOpen(true)
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.3 }}
                    className="text-red-600 hover:text-red-800 transition duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal para Editar */}
      <PopUpWindow open={popupEditOpen} onClose={() => setPopupEditOpen(false)}>
        <h2 className="text-xl mb-4">Editar Lugar de Trabajo</h2>
        <input
          className="w-full border p-2 rounded mb-4"
          value={editLugarTrabajo}
          onChange={(e) => setEditLugarTrabajo(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => setPopupEditOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
            onClick={handleEditar}
          >
            Guardar
          </button>
        </div>
      </PopUpWindow>

      {/* Modal para Confirmar Eliminación */}
      <PopUpWindow open={popupDeleteOpen} onClose={() => setPopupDeleteOpen(false)}>
        <h2 className="text-xl mb-4">¿Eliminar este usuario?</h2>
        <p className="mb-4">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => setPopupDeleteOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded"
            onClick={handleEliminar}
          >
            Eliminar
          </button>
        </div>
      </PopUpWindow>

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

export default TablaUsuarios
