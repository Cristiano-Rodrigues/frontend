import { sql } from '@vercel/postgres';
import {
  Outlet, Product, Sale,
} from '../definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchOutlets (userId: number) {
  noStore()

  try {
    const data = await sql<Outlet>`
      SELECT o.id, o.name, o.location FROM outlet_n_users AS o_n_u
      JOIN outlets AS o
      ON o.id = o_n_u.outlet_id
      JOIN users AS u
      ON u.id = o_n_u.user_id
      WHERE u.id = ${userId}
    `;

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch outlet data.')
  }
}

export async function fetchProducts () {
  noStore()

  try {
    const data = await sql<Product>`
      SELECT * FROM products;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch product data.')
  }
}

export async function fetchSales () {
  noStore()

  try {
    const data = await sql<Sale>`
      select
        s.id, s.date, s.paid_value as paidValue, s.sale_cost as cost, s.payment_type as paymentType,
        c.name as customer, u.name as saler
      from sales as s
      join customers as c
      on s.customer_id = c.id
      join users as u
      on s.user_id = u.id;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale data.')
  }
}