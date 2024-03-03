'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/lib/actions/logout";
import Image from "next/image";
import { useFormState } from "react-dom";

export function UserProfileOptions () {
  const [_, dispatch] = useFormState(logout, {})

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          className="cursor-pointer"
          src="/img/profile.png"
          width={48}
          height={48}
          alt="Profile"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem>
            Definições
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={dispatch}>
          <DropdownMenuItem onSelect={console.log}>
            <button type="submit" className="w-full h-full text-left">Sair</button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}