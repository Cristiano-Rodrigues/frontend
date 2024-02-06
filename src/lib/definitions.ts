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