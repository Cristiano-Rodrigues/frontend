'use server'

import { sql } from "@vercel/postgres";
import { z } from "zod"
import { getCurrentOutlet } from "../cookies";

const RegisterProductSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome do producto é obrigatório.'
  }),
  designation: z.string().optional(),
  price: z.coerce.number().min(1,{
    message: 'Precisa inserir o preço do produto.'
  }),
  type: z.string().optional(),
  origin: z.string().optional(),
  weight: z.string().optional(),
  expiration: z.string().optional()
})

type State = {
  success: boolean;
  errors?: {
    name?: string[];
    price?: string[];
  };
  message?: string;
}

export async function registerProduct (prevState: State, formData: FormData) {
  const parsed = RegisterProductSchema.safeParse({
    name: formData.get('name'),
    designation: formData.get('designation'),
    price: formData.get('price'),
    type: formData.get('type'),
    origin: formData.get('origin'),
    weight: formData.get('weight'),
    expiration: formData.get('expiration')
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: ''
    }
  }

  try {
    const outletId = await getCurrentOutlet()
    const data = parsed.data
    await sql`
      insert into
      products (name, price, designation, type, origin, weight, expiration, outlet_id)
      values (${data.name}, ${data.price}, ${data.designation}, ${data.type},
        ${data.origin}, ${data.weight}, ${data.expiration || null}, ${outletId});
    `
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao registar o novo produto. Tente novamente mais tarde'
    }
  }

  return {
    success: true,
    message: ''
  }
}