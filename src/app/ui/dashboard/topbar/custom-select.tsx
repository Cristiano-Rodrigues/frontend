'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Outlet } from "@/lib/definitions"

export function CustomSelect ({ outlets }: { outlets: Outlet[] }) {
  return (
    <Select defaultValue={outlets[0].id}>
      <SelectTrigger className="min-w-[280px] w-min">
        <SelectValue placeholder="Selecione uma farmácia" />
      </SelectTrigger>
      <SelectContent>
        {
          outlets.map(outlet => (
            <SelectItem
              key={outlet.id}
              value={outlet.id}
            >
              {outlet.name}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>
  )
}