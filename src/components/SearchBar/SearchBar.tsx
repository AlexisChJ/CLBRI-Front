import { Input } from "@/components/ui/input"
import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Zen_Maru_Gothic } from "next/font/google"

interface SearchBarProps {
  searchText: string
  onSearchTextChange: (val: string) => void
  filterClasificacion: string
  onFilterClasificacionChange: (val: string) => void
  filterPrioridad: string
  onFilterPrioridadChange: (val: string) => void
}

const zen_700 = Zen_Maru_Gothic({weight: "700", subsets: ['latin'], preload: true,})

export function SearchBar({
  searchText,
  onSearchTextChange,
  filterClasificacion,
  onFilterClasificacionChange,
  filterPrioridad,
  onFilterPrioridadChange,
}: SearchBarProps) {
  return (
    <div className="flex gap-4">
      <Input 
        type="search" 
        placeholder="Buscar" 
        className={`${ zen_700.className} bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-full`}
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />

      <Select
        value={filterClasificacion}
        onValueChange={onFilterClasificacionChange}
      >
        <SelectTrigger className={`${ zen_700.className} bg-white dark:bg-gray-800 border border-gray-600 rounded-full`}>
          <SelectValue placeholder="Unidad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clasificación</SelectLabel>
            <SelectItem value="all">Todas</SelectItem> 
            <SelectItem value="PH">PH</SelectItem>
            <SelectItem value="Sal">Sal</SelectItem>
            <SelectItem value="embotellado">Embotellado</SelectItem>
            <SelectItem value="enlatado">Enlatado</SelectItem>
            <SelectItem value="perecederos">Perecederos</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filterPrioridad}
        onValueChange={onFilterPrioridadChange}
      >
        <SelectTrigger className={`${ zen_700.className} bg-white dark:bg-gray-800 border border-gray-600 rounded-full`}>
          <SelectValue placeholder="Prioridad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Prioridad</SelectLabel>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="Alta">Alta</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Baja">Baja</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
