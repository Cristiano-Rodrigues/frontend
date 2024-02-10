import { sql } from '@vercel/postgres';
import {
  Outlet, Product, Sale, SaleIten, User,
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

export async function fetchUsers () {
  noStore()

  try {
    const data = await sql<User>`
      select id, name, email, contact, role, permission from users;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user data.')
  }
}

export async function fetchLastSales () {
  noStore()

  try {
    const data = await sql<SaleIten>`
      select
        u.name saler,
        p.name iten,
        p.origin,
        s.date,
        p.price,
        snp.amount
      from sales_n_products snp
      join sales s on s.id = snp.sale_id
      join users u on u.id = s.user_id
      join products p on p.id = snp.product_id
      order by date desc limit 5;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale itens data.')
  }
}

export async function fetchInfoCardData () {
  noStore()

  try {
    const totalSales = await sql<{
      count: number;
    }>`
      select count(*)
      from sales
      where
        extract(month from now()) - 1 = extract(month from date) and
        extract(year from now()) = extract(year from date)
      union all
      select count(*)
      from sales
      where
        extract(month from now()) = extract(month from date) and
        extract(year from now()) = extract(year from date)
    `

    type Round = {
      round: number;
    }

    const saleCostAvg = await sql<Round>`select round(avg(sale_cost), 2) from sales;`
    const productPriceAvg = await sql<Round>`select round(avg(price), 2) from products;`

    const lastMonthSalesCount = totalSales.rows[0].count
    const currentMonthSalesCount = totalSales.rows[1].count
    const saleRate = lastMonthSalesCount == 0 ? (
      currentMonthSalesCount * 100
    ) : (currentMonthSalesCount - lastMonthSalesCount) / lastMonthSalesCount * 100

    return {
      totalSales: {
        amount: currentMonthSalesCount,
        rate: saleRate
      },
      saleCostAvg: saleCostAvg.rows[0].round,
      productPriceAvg: productPriceAvg.rows[0].round
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch info card data.')
  }
}

export async function fetchSaleResults () {
  noStore()

  type Sum = {
    sum: number
  }

  try {
    const lastWeekSalesSum = await sql<Sum>`
      select sum(sale_cost) from sales where extract(day from now() - date) < 7;
    `
    const lastMonthSalesSum = await sql<Sum>`
      select sum(sale_cost) from sales where extract(day from now() - date) < 7;
    `

    return {
      lastWeekSalesSum: lastWeekSalesSum.rows[0].sum,
      lastMonthSalesSum: lastMonthSalesSum.rows[0].sum
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale results.')
  }
}