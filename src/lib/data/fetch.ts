import { sql } from '@vercel/postgres';
import {
  Outlet,
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

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}