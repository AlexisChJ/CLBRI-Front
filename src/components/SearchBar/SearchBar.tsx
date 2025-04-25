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
          <SelectLabel>Unidades</SelectLabel>
          <SelectItem value="Kg">Kilograms</SelectItem>
          <SelectItem value="L">Liters</SelectItem>
          <SelectItem value="g">Grams</SelectItem>
          <SelectItem value="mL">Mililiters</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select>
      <SelectTrigger className="w-[180px] bg-gray-100 dark:bg-gray-800 border border-gray-600 rounded-md">
        <SelectValue placeholder="Clasificación" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clasificaciones</SelectLabel>
          <SelectItem value="empaquetado">Empaquetado</SelectItem>
          <SelectItem value="enlatado">Enlatado</SelectItem>
          <SelectItem value="embotellado">Embotellado</SelectItem>
          <SelectItem value="tetraPack">TetraPack</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
)
}
