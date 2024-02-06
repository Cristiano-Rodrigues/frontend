import { AuthError } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import bcrypt from 'bcrypt'

async function getByEmail (email: string) {
  const result = await sql`SELECT * FROM users WHERE email=${email}`
  return result.rows[0]
}

export async function signIn (user: {
  email: string;
  password: string;
}) {
  const registedUser = await getByEmail(user.email)

  if (!registedUser) {
    throw new AuthError('email')
  }

  const equals = bcrypt.compareSync(user.password, registedUser.password)

  if (!equals) {
    throw new AuthError('password')
  }

  const { password: _, ...filteredUser } = registedUser
  
  return filteredUser
}