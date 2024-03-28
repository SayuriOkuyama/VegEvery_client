'use client'

import { SessionProvider } from 'next-auth/react'
// import { FC, PropsWithChildren } from 'react'

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
