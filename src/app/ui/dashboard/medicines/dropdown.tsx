"use client"

import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ListBulletIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export function Dropdown () {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ListBulletIcon className="w-7 h-7 ml-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Selecionar vista</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="list">
            Lista
            <TableCellsIcon className="w-5 h-5 ml-auto text-darkGray" />
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="grid">
            Grade
            <ListBulletIcon className="w-5 h-5 ml-auto text-darkGray" />
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
