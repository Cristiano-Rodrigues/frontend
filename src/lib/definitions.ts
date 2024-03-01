export class AuthError extends Error {
  constructor (fieldName: string) {
    super(`Invalid Credential ${fieldName}`)
  }
}

export type Outlet = {
  id: string;
  name: string;
  location: string;
}

export type Product = {
  id: string;
  name: string;
  designation: string;
  price: string | number;
  type: string;
  origin: string;
  weight: string | number;
  expiration: Date;
  outlet_id: string;
}

export type Sale = {
  id: string;
  date: Date;
  paidValue: number;
  cost: number;
  paymentType: string;
  customer: string;
  saler: string;
}

export type SaleIten = {
  saler: string;
  iten: string;
  origin: string;
  date: Date;
  price: number | string;
  amount: number
}

export type User = {
  id: string;
  name: string;
  email: string;
  contact: string;
  role: string;
  permission: 'admin' | 'manager' | 'standard'
}

export type Item = {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export type Supplier = {
  id: string;
  name: string;
  address: string;
  contact: string;
  isAvailable: boolean;
}