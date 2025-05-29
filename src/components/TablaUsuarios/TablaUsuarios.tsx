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

  // Paginación
  const rowsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(usuariosList.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const currentUsers = usuariosList.slice(startIndex, startIndex + rowsPerPage)

  const handleEliminar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuariosList]
      nuevaLista.splice(selectedUserIndex, 1)
      setUsuariosList(nuevaLista)
      setPopupDeleteOpen(false)

      // Asegura que la página no quede vacía tras eliminar
      if ((nuevaLista.length <= startIndex) && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      }
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
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className={`w-[10%] ${redHat.className} text-white`}>ID</TableHead>
              <TableHead className={`w-[82%] ${redHat.className} text-white`}>Lugar de trabajo</TableHead>
              <TableHead className={`w-[8%] ${redHat.className} text-white`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((usuario, idx) => {
              const realIndex = startIndex + idx
              return (
                <TableRow className={zenMaru.className} key={usuario.id}>
                  <TableCell className="font-medium">{usuario.id}</TableCell>
                  <TableCell>{usuario.lugarTrabajo}</TableCell>
                  <TableCell className="flex justify-end items-center gap-4 pr-4">
                    <motion.button
                      onClick={() => {
                        setSelectedUserIndex(realIndex)
                        setEditLugarTrabajo(usuario.lugarTrabajo)
                        setPopupEditOpen(true)
                      }}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.5 }}
                      className="text-black hover:text-[#3A70C3] transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setSelectedUserIndex(realIndex)
                        setPopupDeleteOpen(true)
                      }}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-black hover:text-[#E30004] transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </TableCell>
                </TableRow>
              )
            })}
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
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => setPopupEditOpen(false)}>
            Cancelar
          </button>
          <button className="bg-[#3A70C3] text-white hover:bg-[#3A70C3] px-4 py-2 rounded" onClick={handleEditar}>
            Guardar
          </button>
        </div>
      </PopUpWindow>

      {/* Modal para Confirmar Eliminación */}
      <PopUpWindow open={popupDeleteOpen} onClose={() => setPopupDeleteOpen(false)}>
        <h2 className="text-xl mb-4">¿Eliminar este usuario?</h2>
        <p className="mb-4">Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-2">
          <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded" onClick={() => setPopupDeleteOpen(false)}>
            Cancelar
          </button>
          <button className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded" onClick={handleEliminar}>
            Eliminar
          </button>
        </div>
      </PopUpWindow>

      {/* Paginación dinámica */}
      <Pagination className={`pb-4 ${redHat.className}`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#3A70C3] text-white hover:bg-[#3A70C3] hover:text-white"
                    : "hover:bg-blue-100"
                } ${redHat.className}`}
              >
                {i + 1}
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TablaUsuarios
