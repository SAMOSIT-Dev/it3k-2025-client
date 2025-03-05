import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export function replaceSpaceFromUnderline(str: string) {
  return str.replace(/_/, ' ')
}
