import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate (date: Date, format: string) {
  const monthNames = (
    'Janeiro,Fevereiro,Março,Abril,Maio,Junho,Julho,Agosto,Setembro,Outubro,Novembro,Dezembro'
    .split(',')
  )
  return format
    .replaceAll('YYYY', date.getFullYear().toString())
    .replaceAll('MMMM', monthNames[date.getMonth()])
    .replaceAll('DD', date.getDate().toString())
}