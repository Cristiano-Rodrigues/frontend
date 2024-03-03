'use server'

import { sql } from "@vercel/postgres";
import { z } from "zod";
import { getCurrentOutlet } from "../cookies";
import bcrypt from 'bcrypt'

type State = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    permission?: string[];
  };
  message?: string;
}

const RegisterUserSchema = z.object({
  name: z.string({
    invalid_type_error: 'Precisa inserir o nome do usuário'
  }),
  email: z.string().email({
    message: 'Insira um email válido'
  }),
  permission: z.enum(['standard', 'manager', 'admin']),
  password: z.string({
    invalid_type_error: 'Precisa inserir uma password válida'
  }).min(8, {
    message: 'A senha precisa ter pelo menos 8 caracteres.'
  }),
  role: z.string().optional(),
  contact: z.string().optional(),
  address: z.string().optional()
})

export async function registerUser (prevState: State, formData: FormData) {
  const parsed = RegisterUserSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    }
  }

  try {
    const user = await sql`SELECT * FROM users WHERE email=${parsed.data.email}`

    if (!!user.rowCount) {
      return {
        success: false,
        message: 'Esse email já foi registado.'
      }
    }

    const {
      name,
      email,
      permission,
      password,
      role,
      contact,
      address
    } = parsed.data

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, permission, password, role, contact, address)
      VALUES (${name}, ${email}, ${permission}, ${hashedPassword}, ${role}, ${contact}, ${address}) RETURNING id
    `

    const outletId = await getCurrentOutlet()
    const userId = result.rows[0].id

    await sql`
      INSERT INTO outlet_n_users (outlet_id, user_id)
      VALUES (${outletId}, ${userId})
    `

  } catch (error) {
    return {
      success: false,
      message: 'Alguma coisa correu mal ao registar o novo usuário.'
    }
  }

  return {
    success: true,
    message: ''
  }
}