'use client'

import Link from "next/link";
import {
  HomeIcon,
  BeakerIcon,
  ShoppingBagIcon,
  TruckIcon,
  UsersIcon,
  MapPinIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menuItems = [
  { name: 'Home', href: '', Icon: HomeIcon },
  { name: 'Remédios e diversos', href: '/medicines', Icon: BeakerIcon },
  { name: 'Vendas', href: '/sales', Icon: ShoppingBagIcon },
  { name: 'Fornecedores', href: '/suppliers', Icon: TruckIcon },
  { name: 'Usuários', href: '/users', Icon: UsersIcon },
  { name: 'Pontos de venda', href: '/outlets', Icon: MapPinIcon },
]

const moreOptions = [
  { name: 'Configurações', href: '/settings', Icon: Cog6ToothIcon },
  { name: 'Ajuda', href: '/help', Icon: QuestionMarkCircleIcon },
  { name: 'Sobre', href: '/about', Icon: InformationCircleIcon },
]

export function NavLinks () {
  const pathname = usePathname();

  return (
    <div className="flex flex-col justify-between h-[calc(100%-114px)] mt-16">
      <ul className="flex flex-col gap-2">
        {
          menuItems.map(({ name, href, Icon }) => (
            <li key={name}>
              <Link
                className={clsx(
                  "flex items-center gap-4 px-4 py-1 rounded-full hover:bg-primary-25 duration-300",
                  {
                    "bg-primary-25": pathname == `/dashboard${href}`
                  }
                )}
                href={`/dashboard${href}`}
              >
                <Icon className="w-4 h-4"/>
                { name }
              </Link>
            </li>
          ))
        }
      </ul>
      <ul className="flex flex-col gap-2">
        {
          moreOptions.map(({ name, href, Icon }) => (
            <li key={name}>
              <Link
                className={clsx(
                  "flex items-center gap-4 px-4 py-1 rounded-full hover:bg-primary-25 duration-300",
                  {
                    "bg-primary-25": pathname == href
                  }
                )}
                href={`/dashboard${href}`}
              >
                <Icon className="w-4 h-4"/>
                { name }
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}