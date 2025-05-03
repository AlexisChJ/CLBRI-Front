"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Zen_Maru_Gothic } from 'next/font/google'
import { countriesList } from "@/lib/countries"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const zen_700 = Zen_Maru_Gothic({weight: "700", subsets: ['latin'], preload: true,})

export function CountryCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${ zen_700.className } w-[200px] justify-between shadow-none text-[#5B5B5B] rounded-2xl border-[#5B5B5B] border-2`}
        >
          {value
            ? countriesList.find((framework) => framework.name === value)?.name
            : "País"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-[#5B5B5B]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {countriesList.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
