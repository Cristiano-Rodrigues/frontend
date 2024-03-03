'use server'

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

export async function logout (prevState: {}, formData: FormData) {
  cookies().delete('user')
  redirect('/')

  return {}
}