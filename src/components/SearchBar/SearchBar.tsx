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
 
export function SearchBar() {
  return (
    <div className="flex gap-4">
      <Input type="search" placeholder="Buscar" 
      className="bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md"/>

      <Select>
      <SelectTrigger className="w-[180px] bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md">
        <SelectValue placeholder="Unidad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clasificación</SelectLabel>
          <SelectItem value="embotellado">Embotellado</SelectItem>
          <SelectItem value="enlatado">Enlatado</SelectItem>
          <SelectItem value="perecederos">Perecederos</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select>
      <SelectTrigger className="w-[180px] bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md">
        <SelectValue placeholder="Prioridad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Prioridad</SelectLabel>
          <SelectItem value="alta">Alta</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="baja">Baja</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
)
}
