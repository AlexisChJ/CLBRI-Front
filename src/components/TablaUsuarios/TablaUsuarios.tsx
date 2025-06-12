"use client";
import PopUpWindow from "@/components/PopUpWindow/PopupWindow";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google";
import { Trash2, Pencil } from "lucide-react";
import { getLatLngFromAddress } from "@/lib/geocode";

const redHat = Red_Hat_Display({
  weight: ["800"],
  subsets: ["latin"],
  preload: true,
});
const zenMaru = Zen_Maru_Gothic({
  weight: ["500"],
  subsets: ["latin"],
  preload: true,
});

type Usuario = {
  id: string;
  lugarTrabajo: string;
  nombre: string;
};

type Props = {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
  userLocations: { lat: number; lng: number; title: string }[];
  setUserLocations: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number; title: string }[]>
  >;
  firebaseToken: string | null;
};

const TablaUsuarios = ({
  usuarios,
  setUsuarios,
  userLocations,
  setUserLocations,
}: Props) => {
  const [popupEditOpen, setPopupEditOpen] = useState(false);
  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  const [editAddress, setEditAddress] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editState, setEditState] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editPostalCode, setEditPostalCode] = useState("");

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(usuarios.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = usuarios.slice(startIndex, startIndex + rowsPerPage);

  const handleEliminar = () => {
    if (selectedUserIndex !== null) {
      const nuevaLista = [...usuarios];
      const usuarioEliminado = nuevaLista[selectedUserIndex];
      nuevaLista.splice(selectedUserIndex, 1);
      setUsuarios(nuevaLista);
      setUserLocations(
        userLocations.filter((loc) => loc.title !== usuarioEliminado.nombre)
      );
      setPopupDeleteOpen(false);

      if (nuevaLista.length <= startIndex && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleEditar = async () => {
    if (selectedUserIndex === null) return;

    const nuevaLista = [...usuarios];
    const usuario = nuevaLista[selectedUserIndex];

    const nuevoLugar = `${editAddress}, ${editCity}, ${editState}, ${editCountry}, ${editPostalCode}`;
    usuario.lugarTrabajo = nuevoLugar;

    const coords = await getLatLngFromAddress(nuevoLugar);

    if (coords) {
      const nuevaUbicacion = {
        lat: coords.lat,
        lng: coords.lng,
        title: usuario.nombre,
      };

      // Reemplaza marcador anterior
      const nuevasUbicaciones = userLocations.map((loc) =>
        loc.title === usuario.nombre ? nuevaUbicacion : loc
      );
      setUserLocations(nuevasUbicaciones);
    }

    setUsuarios(nuevaLista);
    setPopupEditOpen(false);
  };

  const openEditPopup = (index: number) => {
    const usuario = usuarios[index];
    const partes = usuario.lugarTrabajo.split(",").map((p) => p.trim());
    setEditAddress(partes[0] || "");
    setEditCity(partes[1] || "");
    setEditState(partes[2] || "");
    setEditCountry(partes[3] || "");
    setEditPostalCode(partes[4] || "");
    setSelectedUserIndex(index);
    setPopupEditOpen(true);
  };

  return (
    <div className="flex flex-col space-y-2 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className={`w-[10%] ${redHat.className} text-white`}>
                ID
              </TableHead>
              <TableHead className={`w-[82%] ${redHat.className} text-white`}>
                Lugar de trabajo
              </TableHead>
              <TableHead className={`w-[8%] ${redHat.className} text-white`}>
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((usuario, idx) => {
              const realIndex = startIndex + idx;
              return (
                <TableRow className={zenMaru.className} key={usuario.id}>
                  <TableCell className="font-medium">{usuario.id}</TableCell>
                  <TableCell>{usuario.lugarTrabajo}</TableCell>
                  <TableCell className="flex justify-end items-center gap-4 pr-4">
                    <motion.button
                      onClick={() => openEditPopup(realIndex)}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.5 }}
                      className="text-black hover:text-[#3A70C3] transition-colors duration-200"
                    >
                      <Pencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setSelectedUserIndex(realIndex);
                        setPopupDeleteOpen(true);
                      }}
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.3 }}
                      className="text-black hover:text-[#E30004] transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modal Editar */}
      <PopUpWindow open={popupEditOpen} onClose={() => setPopupEditOpen(false)}>
        <h2 className="text-xl mb-4">Editar Dirección</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              className="w-full border p-2 rounded"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad
            </label>
            <input
              className="w-full border p-2 rounded"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>
            <input
              className="w-full border p-2 rounded"
              value={editState}
              onChange={(e) => setEditState(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              País
            </label>
            <input
              className="w-full border p-2 rounded"
              value={editCountry}
              onChange={(e) => setEditCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código Postal
            </label>
            <input
              className="w-full border p-2 rounded"
              value={editPostalCode}
              onChange={(e) => setEditPostalCode(e.target.value)}
            />
          </div>
        </div>

        {/* Mensaje de error si algún campo está vacío */}
        {(editAddress === "" ||
          editCity === "" ||
          editState === "" ||
          editCountry === "" ||
          editPostalCode === "") && (
          <p className="text-red-600 mt-3 text-sm">
            Todos los campos deben estar completos.
          </p>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={() => setPopupEditOpen(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-[#3A70C3] text-white hover:bg-[#3A70C3] px-4 py-2 rounded disabled:opacity-50"
            onClick={handleEditar}
            disabled={
              editAddress === "" ||
              editCity === "" ||
              editState === "" ||
              editCountry === "" ||
              editPostalCode === ""
            }
          >
            Guardar
          </button>
        </div>
      </PopUpWindow>

      {/* Modal Eliminar */}
      <PopUpWindow
        open={popupDeleteOpen}
        onClose={() => setPopupDeleteOpen(false)}
      >
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

      <Pagination className={`pb-4 ${redHat.className}`}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#3A70C3] text-white"
                    : "hover:bg-blue-100"
                }`}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablaUsuarios;
