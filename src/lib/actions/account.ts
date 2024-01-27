'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from "bcrypt";
import { redirect } from 'next/navigation';

export async function signup (formData: FormData) {
  const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
  });

  const {
    name,
    email,
    password
  } = UserSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  });

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const permission = 'admin';
  
  try {
    await sql`
      insert into users (name, email, permission, password)
      values (${name}, ${email}, ${permission}, ${hash});
    `;
  } catch (error) {
    console.error(error);
    return {
      error
    }
  }
  redirect("/dashboard");
}