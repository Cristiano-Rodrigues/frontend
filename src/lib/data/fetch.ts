import { sql } from '@vercel/postgres';
import {
  Outlet, Product, Sale, SaleIten, Supplier, User,
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

export async function fetchProducts (outletId: string) {
  noStore()

  try {
    const data = await sql<Product>`
      SELECT * FROM products WHERE outlet_id=${outletId};
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch product data.')
  }
}

export async function fetchAvailableProducts (outletId: string) {
  noStore()

  try {
    const data = await sql<Product>`
      SELECT * FROM products WHERE outlet_id=${outletId} AND is_available = true;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch available product data.')
  }
}

export async function fetchSales (outletId: string) {
  noStore()

  try {
    const data = await sql<Sale>`
      select
        s.id, s.date, s.paid_value as paidValue, s.sale_cost as cost, s.payment_type as paymentType,
        s.payer as customer, u.name as saler
      from sales as s
      join users as u
      on s.user_id = u.id
      where s.outlet_id=${outletId};
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale data.')
  }
}

export async function fetchUsers (outletId: string) {
  noStore()

  try {
    const data = await sql<User>`
      select
        u.id, u.name, u.email, u.contact, u.role, u.permission
      from outlet_n_users onu
      join users u on onu.user_id = u.id
      where onu.outlet_id=${outletId}
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch user data.')
  }
}

export async function fetchLastSales (outletId: string) {
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
      where s.outlet_id=${outletId}
      order by date desc limit 5;
    `

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale itens data.')
  }
}

export async function fetchInfoCardData (outletId: string) {
  noStore()

  try {
    const totalSales = await sql<{
      count: number;
    }>`
      select count(*)
      from sales s
      where
        extract(month from now()) - 1 = extract(month from date) and
        extract(year from now()) = extract(year from date) and
        s.outlet_id=${outletId}
      union all
      select count(*)
      from sales s
      where
        extract(month from now()) = extract(month from date) and
        extract(year from now()) = extract(year from date) and
        s.outlet_id=${outletId}
    `

    type Round = {
      round: number;
    }

    const saleCostAvg = await sql<Round>`
      select round(avg(sale_cost), 2) from sales s
      where s.outlet_id=${outletId};
    `
    const productPriceAvg = await sql<Round>`
      select round(avg(price), 2) from products p
      where p.outlet_id=${outletId};
    `

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
      saleCostAvg: saleCostAvg.rows[0].round ?? 0,
      productPriceAvg: productPriceAvg.rows[0].round ?? 0
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch info card data.')
  }
}

export async function fetchSaleResults (outletId: string) {
  noStore()

  type Sum = {
    sum: number
  }

  try {
    const lastWeekSalesSum = await sql<Sum>`
      select sum(sale_cost) from sales
      where
        extract(day from now() - date) < 7 and
        outlet_id=${outletId};
    `
    const lastMonthSalesSum = await sql<Sum>`
      select sum(sale_cost) from sales
      where
        extract(day from now() - date) < 30 and
        outlet_id=${outletId};
    `

    return {
      lastWeekSalesSum: lastWeekSalesSum.rows[0].sum ?? 0,
      lastMonthSalesSum: lastMonthSalesSum.rows[0].sum ?? 0
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch sale results.')
  }
}

export async function fetchSuppliers () {
  noStore()

  try {
    const data = await sql<Supplier>`
      SELECT
        *,
        (
        CASE WHEN is_available = true
            THEN 'Sim'
            ELSE 'Não'
        END
        ) as is_available
      FROM suppliers;
    `;

    return data.rows
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch suppliers data.')
  }
}