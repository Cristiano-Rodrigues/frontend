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