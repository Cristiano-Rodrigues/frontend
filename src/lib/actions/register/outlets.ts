'use server'

import { z } from "zod";
import { getCurrentUser } from "../cookies";
import { sql } from "@vercel/postgres";

type State = {
  success?: boolean;
  errors?: {
    name?: string[];
  };
  message?: string;
}

const RegisterProductSchema = z.object({
  name: z.string().min(1, {
    message: 'Precisa inserir o nome do ponto de venda'
  }),
  location: z.string().optional()
})

export async function registerOutlet (prevState: State, formData: FormData) {
  const entries = Object.fromEntries(formData.entries())
  const parsed = RegisterProductSchema.safeParse(entries)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    }
  }

  try {
    const user = await getCurrentUser()
    const { name, location } = parsed.data

    const result = await sql`
      INSERT INTO outlets (name, location)
      VALUES (${name}, ${location}) RETURNING id;
    `

    const outletId = result.rows[0].id
    await sql`
      INSERT INTO outlet_n_users (outlet_id, user_id)
      VALUES (${outletId}, ${user.id})
    `
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao cadastrar novo ponto de venda. Tente novamente mais tarde.'
    }
  }

  return {
    success: true,
    message: ''
  }
}