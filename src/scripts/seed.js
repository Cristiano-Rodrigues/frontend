const bcrypt = require('bcrypt')
const { db } = require('@vercel/postgres')
const {
  users,
  outlets
} = require('../lib/data/setup-data')

async function seedOutlets (client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
      create table if not exists outlets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) not null,
        location varchar(255)
      );
    `

    console.log('Created outlets table')

    await Promise.all(
      outlets.map(async outlet => {
        return client.sql`
          INSERT INTO outlets (id, name, location)
          VALUES (${outlet.id}, ${outlet.name}, ${outlet.location});
        `;
      })
    )

    console.log('Inserted outlets successfully')
  } catch (error) {
    console.log('Error while seeding outlets table:', error)
    throw error
  }
}

async function seedUsers (client) {
  try {
    await client.sql`create type Permission as enum('standard', 'manager', 'admin');`

    await client.sql`
      create table if not exists users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) not null,
        email varchar(255) unique not null,
        contact varchar(255),
        address varchar(255),
        role varchar(255),
        permission Permission not null,
        password varchar(255) not null,
        profile_img varchar(255)
      );
    `

    console.log('Created users table')

    await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, password, permission)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.permission});
        `;
      })
    )

    console.log('admin user inserted correctly')
  } catch (error) {
    console.log('Error while seeding users\' table:', error)
    throw error
  }
}

async function seedOutletsUsers (client) {
  try {
    await client.sql `
      create table if not exists outlet_n_users (
        outlet_id uuid not null,
        user_id uuid not null,
        foreign key (outlet_id) references outlets(id),
        foreign key (user_id) references users(id)
      );
    `

    console.log('Created outlet_n_users table')

    await Promise.all(
      outlets.map(async outlet => {
        return client.sql`
          INSERT INTO outlet_n_users (outlet_id, user_id) VALUES (${outlet.id}, ${users[0].id});
        `;
      })
    )

    console.log('Insert relations correctly')
  } catch (error) {
    console.log('Error while seeding outlet_n_users table:', error)
    throw error
  }
}

async function seedSuppliers (client) {
  try {
    await client.sql`
      create table if not exists suppliers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) not null,
        address varchar(255),
        contact varchar(255),
        is_available bool not null default true
      );
    `

    console.log('Created suppliers table')
  } catch (error) {
    console.log('Error while seeding suppliers table:', error)
    throw error
  }
}

async function seedOutletsSuppliers (client) {
  try {
    await client.sql`
      create table if not exists outlet_n_suppliers (
        supplier_id uuid not null,
        outlet_id uuid not null,
        foreign key (supplier_id) references suppliers(id),
        foreign key (outlet_id) references outlets(id)
      );
    `

    console.log('Created outlet_n_suppliers table')
  } catch (error) {
    console.log('Error while seeding outlet_n_suppliers table:', error)
    throw error
  }
}

async function seedProducts (client) {
  try {
    await client.sql`
      create table if not exists products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) not null,
        designation varchar(255),
        price decimal(14,2) not null,
        type varchar(255),
        origin varchar(255),
        weight decimal(5,2),
        expiration date,
        outlet_id uuid not null,
        foreign key (outlet_id) references outlets(id)
      );
    `

    console.log('Created products table')
  } catch (error) {
    console.log('Error while seeding products table:', error)
    throw error
  }
}

async function seedCustomers (client) {
  try {
    await client.sql`create type Gender as enum('M', 'F');`

    await client.sql`
      create table if not exists customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name varchar(255) not null,
        address varchar(255),
        contact varchar(255),
        gender Gender,
        born_date date
      );
    `

    console.log('Created customers table')
  } catch (error) {
    console.log('Error while seeding customers table:', error)
    throw error
  }
}

async function seedSales (client) {
  try {
    await client.sql`
      create table if not exists sales (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        date date not null default (now()),
        payer varchar(255) not null,
        paid_value decimal(14,2) not null,
        sale_cost decimal(14,2) null,
        payment_type varchar(255),
        user_id uuid not null,
        outlet_id uuid not null,
        foreign key (user_id) references users(id),
        foreign key (outlet_id) references outlets(id)
      );
    `

    console.log('Created sales table')
  } catch (error) {
    console.log('Error while seeding sales table:', error)
    throw error
  }
}

async function seedSalesProducts (client) {
  try {
    await client.sql`
      create table if not exists sales_n_products (
        sale_id uuid not null,
        product_id uuid not null,
        amount int not null,
        foreign key (sale_id) references sales(id),
        foreign key (product_id) references products(id)
      );
    `

    console.log('Created sales_n_products table')
  } catch (error) {
    console.log('Error while seeding sales_n_products table:', error)
    throw error
  }
}

async function main() {
  const client = await db.connect()

  await seedOutlets(client)
  await seedUsers(client)
  await seedOutletsUsers(client)
  await seedSuppliers(client)
  await seedOutletsSuppliers(client)
  await seedProducts(client)
  await seedCustomers(client)
  await seedSales(client)
  await seedSalesProducts(client)

  await client.end()
}

main().catch(err => {
  console.error('An error occurred while attempting to seed the database:', err)
})
