import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const userStringified = request.cookies.get('user')?.value
  const user = userStringified ? JSON.parse(userStringified) : null
  const isLoggedIn = !!user
  const isInDashboard = request.nextUrl.pathname.startsWith('/dashboard')
 
  if (isLoggedIn && !isInDashboard) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } else if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: ['/dashboard(/?.*)'],
}