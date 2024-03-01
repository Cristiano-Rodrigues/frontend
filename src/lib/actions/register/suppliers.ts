'use server'

import { sql } from "@vercel/postgres";
import { z } from "zod";

type State = {
  success: boolean;
  errors?: {
    name?: string[];
    address?: string[];
    contact?: string[];
  };
  message?: string;
}

const RegisterSupplierSchema = z.object({
  name: z.string({
    invalid_type_error: 'Precisa preencher o nome do fornecedor'
  }),
  address: z.string().optional(),
  contact: z.string().optional(),
  isAvailable: z.string().optional()
})

export async function registerSupplier (prevState: State, formData: FormData) {
  const entries = Object.fromEntries(formData.entries())
  const parsed = RegisterSupplierSchema.safeParse(entries)

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors
    }
  }

  try {
    const supplier = {
      ...parsed.data,
      isAvailable: parsed.data.isAvailable == 'on'
    }

    await sql`
      insert into suppliers (name, address, contact, is_available)
      values (${supplier.name}, ${supplier.address}, ${supplier.contact}, ${supplier.isAvailable});
    `
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao registar o novo fornecedor. Tente novamente mais tarde'
    }
  }

  return {
    success: true,
    message: ''
  }
}