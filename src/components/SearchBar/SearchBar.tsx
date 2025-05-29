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

interface SearchBarProps {
  searchText: string
  onSearchTextChange: (val: string) => void
  filterClasificacion: string
  onFilterClasificacionChange: (val: string) => void
  filterPrioridad: string
  onFilterPrioridadChange: (val: string) => void
}

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
        className="bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md"
        value={searchText}
        onChange={e => onSearchTextChange(e.target.value)}
      />

      <Select
        value={filterClasificacion}
        onValueChange={onFilterClasificacionChange}
      >
        <SelectTrigger className="w-[180px] bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md">
          <SelectValue placeholder="Clasificación" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Clasificación</SelectLabel>
            <SelectItem value="all">Todas</SelectItem> 
            <SelectItem value="Embotellado">Embotellado</SelectItem>
            <SelectItem value="Enlatado">Enlatado</SelectItem>
            <SelectItem value="Perecederos">Perecederos</SelectItem>
            <SelectItem value="Otros">Otros</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        value={filterPrioridad}
        onValueChange={onFilterPrioridadChange}
      >
        <SelectTrigger className="w-[180px] bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md">
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
