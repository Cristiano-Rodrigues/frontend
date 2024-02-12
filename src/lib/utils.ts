import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from 'moment';
import 'moment/locale/pt'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate (date: Date, format: string) {
  moment.locale('pt')
  return moment(date).format(format)
}

export function formatNumber (number: number) {
  return String(number).replace('.', ',')
}