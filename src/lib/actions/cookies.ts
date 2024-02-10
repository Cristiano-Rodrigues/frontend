'use server'

import { cookies } from 'next/headers';

export async function setCurrentUser (user: any) {
  const stringifiedSessionData = JSON.stringify(user)
  cookies().set('user', stringifiedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  })
}

export async function getCurrentUser () {
  const userString = cookies().get('user')?.value
  return userString ? JSON.parse(userString) : null
}

export async function setCurrentOutlet (outletId: string) {
  cookies().set('outlet', outletId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60,
    path: '/'
  })
}

export async function getCurrentOutlet () {
  return cookies().get('outlet')?.value
}