'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setCurrentOutlet } from "@/lib/actions/cookies"
import { Outlet } from "@/lib/definitions"

export function CustomSelect ({
  selected,
  outlets
}: {
  selected: string;
  outlets: Outlet[]
}) {
  return (
    <Select
      defaultValue={selected}
      onValueChange={setCurrentOutlet}
    >
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