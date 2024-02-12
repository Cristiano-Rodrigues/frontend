'use server'

import { z } from 'zod'
import { signIn } from '../../../auth';
import { AuthError } from '../definitions';
import { redirect } from 'next/navigation';
import { fetchOutlets } from '../data/fetch';
import { setCurrentOutlet, setCurrentUser } from './cookies';

type State = {
  errors?: {
    email?: string[];
    password?: string[]
  },
  message?: string;
}

const LoginSchema = z.object({
  email: z.string().email({
    message: 'Insira um email válido'
  }),
  password: z.string({
    invalid_type_error: 'Password inválida'
  })
})

export async function authenticate (prevState: State, formData: FormData) {
  const user = {
    email: String(formData.get('email')),
    password: String(formData.get('password'))
  }
  const validatedUser = LoginSchema.safeParse(user)

  if (!validatedUser.success) {
    return {
      errors: validatedUser.error.flatten().fieldErrors,
      message: ''
    }
  }

  try {
    const authUser = await signIn(user)

    await setCurrentUser(authUser)

    const [ firstAllowedOutlet ] = await fetchOutlets(authUser.id);
    await setCurrentOutlet(firstAllowedOutlet.id)

    redirect('/dashboard')
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        message: 'Email ou senha incorrectos.'
      }
    }
    throw error
  }
  
  return {}
}