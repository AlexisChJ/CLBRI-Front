"use client"

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

const EditIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M16.862 3.487a2.5 2.5 0 0 1 3.535 3.535l-11.01 11.01a2 2 0 0 1-.707.44l-4.01 1.337a.5.5 0 0 1-.632-.632l1.337-4.01a2 2 0 0 1 .44-.707l11.01-11.01Zm2.121 2.121-1.414-1.414-11.01 11.01-1.01 3.03 3.03-1.01 11.01-11.01Z" fill="#3b82f6"/>
  </svg>
)

const DeleteIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path d="M6 7h12M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

type Usuario = {
  id: string;
  lugarTrabajo: string;
  nombre?: string;
};

const TablaUsuarios = ({ usuarios }: { usuarios: Usuario[] }) => {
  return (
    <div className="flex flex-col space-y-2 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableCaption>Lista de Usuarios</TableCaption>
          <TableHeader>
            <TableRow className="bg-blue-200 text-blue-800 hover:bg-blue-200">
              <TableHead className={`w-[100px] ${redHat.className}`}>ID</TableHead>
              <TableHead className={`${redHat.className}`}>Lugar de trabajo</TableHead>
              <TableHead className={`w-[80px] text-right ${redHat.className}`}></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((usuario, idx) => (
              <TableRow className={zenMaru.className} key={idx}>
                <TableCell className="font-medium">{usuario.id}</TableCell>
                <TableCell>{usuario.lugarTrabajo}</TableCell>
                <TableCell className="flex justify-end space-x-2">
                  <button
                    className="p-1 rounded hover:bg-blue-100 transition"
                    aria-label="Editar"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-red-100 transition"
                    aria-label="Borrar"
                  >
                    <DeleteIcon />
                  </button>
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
  );
};

export default TablaUsuarios;