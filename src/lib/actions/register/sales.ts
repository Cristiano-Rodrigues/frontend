'use server'

import { Item } from "@/lib/definitions";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { getCurrentOutlet, getCurrentUser } from "../cookies";

export type State = {
  success: boolean;
  errors?: {
    customerName?: string[],
    paidValue?: string[];
    paymentType: string[];
  };
  message?: string;
}

const RegisterSaleSchema = z.object({
  customerName: z.string().min(1, {
    message: 'Insira o nome do cliente'
  }),
  paidValue: z.coerce.number().min(1, {
    message: 'Insira o valor pago'
  }),
  paymentType: z.enum(['card', 'money', 'transfer', 'other'], {
    invalid_type_error: 'Insira um tipo de pagamento válido'
  })
})

export async function registerSale (items: Item[], prevState: State, formData: FormData) {
  const parsed = RegisterSaleSchema.safeParse({
    customerName: formData.get('customer-name'),
    paidValue: formData.get('paid-value'),
    paymentType: formData.get('payment-type')
  })

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      message: ''
    }
  }

  if (items.length == 0) {
    return {
      success: false,
      message: 'Insira ao menos um produto na lista de compra'
    }
  }

  const total = items.reduce((total, item) => (
    total + item.amount * item.price
  ), 0)

  if (parsed.data.paidValue < total) {
    return {
      success: false,
      message: 'Valor pago é insuficiente'
    }
  }

  try {
    const data = parsed.data
    const user = await getCurrentUser()
    const outletId = await getCurrentOutlet()
    const result = await sql`
      insert into
      sales (paid_value, sale_cost, payment_type, payer, user_id, outlet_id)
      values (${data.paidValue}, ${total}, ${data.paymentType}, ${data.customerName},
        ${user.id}, ${outletId}) RETURNING id;
    `

    const insertedSaleId = result.rows[0].id

    await Promise.all(
      items.map(async item => (
        await sql`
          insert into sales_n_products (sale_id, product_id, amount)
          values (${insertedSaleId}, ${item.id}, ${item.amount})
        `
      ))
    )
  } catch (error) {
    console.log(error)
  }

  return {
    success: true,
    message: ''
  }
}