"use client"

import { useState } from "react"
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google"
import PopUpWindow from "@/components/PopUpWindow/PopupWindow"
import { Pencil, Trash2 } from "lucide-react"

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

type Usuario = {
  id: string;
  lugarTrabajo: string;
  nombre: string;
};

type Props = {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  userLocations: { lat: number; lng: number; title: string }[];
  setUserLocations: React.Dispatch<React.SetStateAction<{ lat: number; lng: number; title: string }[]>>;
};

const TablaUsuarios = ({ usuarios, setUsuarios, userLocations, setUserLocations }: Props) => {
  const [popupEditOpen, setPopupEditOpen] = useState(false)
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false)
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null)
  const [editLugarTrabajo, setEditLugarTrabajo] = useState("")

  const handleEliminar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuarios];
      const usuarioEliminado = nuevaLista[selectedUserIndex];

      nuevaLista.splice(selectedUserIndex, 1);
      setUsuarios(nuevaLista);

      // Elimina también el marcador del mapa
      setUserLocations(userLocations.filter(loc => loc.title !== usuarioEliminado.nombre));
      setPopupDeleteOpen(false);
    }
  }

  const handleEditar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuarios];
      nuevaLista[selectedUserIndex].lugarTrabajo = editLugarTrabajo;
      setUsuarios(nuevaLista);
      setPopupEditOpen(false);
    }
  }

  return (
    <div className="flex flex-col space-y-2 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableCaption>Lista de Usuarios</TableCaption>
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className={`w-[10%] ${redHat.className} text-white`}>ID</TableHead>
              <TableHead className={`w-[82%] ${redHat.className} text-white`}>Lugar de trabajo</TableHead>
              <TableHead className={`w-[8%] ${redHat.className} text-white`}>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario, idx) => (
              <TableRow className={zenMaru.className} key={usuario.id}>
                <TableCell className="font-medium">{usuario.id}</TableCell>
                <TableCell>{usuario.lugarTrabajo}</TableCell>
                <TableCell className="flex justify-end space-x-2 pr-4">
                  <button
                    onClick={() => {
                      setSelectedUserIndex(idx);
                      setEditLugarTrabajo(usuario.lugarTrabajo);
                      setPopupEditOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 transition"
                    aria-label="Editar"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUserIndex(idx);
                      setPopupDeleteOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 transition"
                    aria-label="Borrar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pop-up de Editar */}
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

      {/* Pop-up de Eliminar */}
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
    </div>
  )
}

export default TablaUsuarios
