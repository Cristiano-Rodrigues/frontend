import { BellIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";

export function UserProfileOptions () {
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
        <DropdownMenuItem>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Topbar () {
  return (
    <div className="flex justify-between w-full h-[80px] bg-white px-6 py-4">
      <div className="flex items-start md:items-center gap-2 flex-col md:flex-row">
        <label htmlFor="outlet">Escolha a farmácia</label>
        <select
          id="outlet"
          className="border-none min-w-72 h-[35px] bg-lightestGray"
        ></select>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex justify-center items-center w-8 h-8 rounded-sm">
          <BellIcon className="w-5 h-5" />
        </button>
        <UserProfileOptions />
      </div>
    </div>
  )
}