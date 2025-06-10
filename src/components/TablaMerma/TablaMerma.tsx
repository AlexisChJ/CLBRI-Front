"use client"

import { useState, useMemo } from "react" // Import useMemo for performance
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
import { Batch } from "@/types/Batch" // Import your Batch type

const redHat = Red_Hat_Display({ weight: ["800"], subsets: ["latin"], preload: true })
const zenMaru = Zen_Maru_Gothic({ weight: ["500"], subsets: ["latin"], preload: true })

interface TablaMermaProps {
  searchText: string
  filterClasificacion: string 
  filterPrioridad: string   
  batches: Batch[] 
}

const TablaMerma = ({ searchText, filterClasificacion, filterPrioridad, batches }: TablaMermaProps) => {


  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [selectedItems, setSelectedItems] = useState<string[]>([]) 


  const processedBatches = useMemo(() => {
    return batches.filter(batch => {
      const description = batch.description?.toLowerCase() || "";
      const sku = batch.sku?.toLowerCase() || "";
      const classificationName = batch.classification?.name?.toLowerCase() || "";
      const priority = batch.priority?.toLowerCase() || "";
      const entryDate = batch.entryDate?.toString().toLowerCase() || ""; 
      const expirationDate = batch.expirationDate?.toString().toLowerCase() || ""; 

      const searchLower = searchText.toLowerCase();

      const matchesSearch = searchText === "" || searchText === "all" ||
        description.includes(searchLower) ||
        sku.includes(searchLower) ||
        classificationName.includes(searchLower) ||
        priority.includes(searchLower) ||
        entryDate.includes(searchLower) ||
        expirationDate.includes(searchLower);

      const matchesClasificacion = filterClasificacion === "" || filterClasificacion === "all" ||
        classificationName === filterClasificacion.toLowerCase();

      const matchesPrioridad = filterPrioridad === "" || filterPrioridad === "all" ||
        priority === filterPrioridad.toLowerCase();

      return matchesSearch && matchesClasificacion && matchesPrioridad;
    });
  }, [batches, searchText, filterClasificacion, filterPrioridad]);

  const totalPages = Math.ceil(processedBatches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentPageData = processedBatches.slice(startIndex, startIndex + itemsPerPage)

  const toggleSelection = (batchId: string) => { 
    setSelectedItems(prev =>
      prev.includes(batchId)
        ? prev.filter(item => item !== batchId)
        : [...prev, batchId]
    )
  }

  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  } else if (currentPage === 0 && totalPages > 0) { 
    setCurrentPage(1);
  }


  return (
    <div className="flex flex-col space-y-3 h-full w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-sm border">
        <Table className="min-w-full table-auto">
          <TableHeader>
            <TableRow className="bg-[#3A70C3] hover:bg-[#3A70C3]">
              <TableHead className="w-[5%] text-white"></TableHead>
              <TableHead className={`w-[25%] ${redHat.className} text-white`}>Nombre</TableHead> {/* Updated header */}
              <TableHead className={`w-[15%] ${redHat.className} text-white`}>Clasificación</TableHead>
              <TableHead className={`w-[20%] ${redHat.className} text-white`}>Fecha de llegada</TableHead>
              <TableHead className={`w-[20%] ${redHat.className} text-white`}>Caducidad</TableHead>
              <TableHead className={`w-[15%] ${redHat.className} text-white`}>Prioridad</TableHead>
            </TableRow>
          </TableHeader>

          <AnimatePresence mode="wait">
            <motion.tbody
              key={currentPage} // Animate table body when page changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {currentPageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No se encontraron batches con los filtros aplicados.
                  </TableCell>
                </TableRow>
              ) : (
                currentPageData.map((batch) => ( 
                  <TableRow key={batch.id} className={zenMaru.className}> 
                    <TableCell className="text-center">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(String(batch.id))} 
                        onChange={() => toggleSelection(String(batch.id))} 
                      />
                    </TableCell>
                    <TableCell>{batch.description || batch.sku}</TableCell> 
                    <TableCell>{batch.classification?.name || "N/A"}</TableCell> 
                    <TableCell>{batch.entryDate?.toString() || "N/A"}</TableCell> 
                    <TableCell>{batch.expirationDate?.toString() || "N/A"}</TableCell>
                    <TableCell>{batch.priority || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
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