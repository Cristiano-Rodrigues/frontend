'use server'

import { z } from 'zod'
import { signIn } from '../../../auth';
import { AuthError } from '../definitions';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

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

    const encryptedSessionData = JSON.stringify(authUser)
    cookies().set('user', encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

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