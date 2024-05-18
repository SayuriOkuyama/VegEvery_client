'use client'

import { createContext, useState } from 'react'
import { useAuth } from '@/hooks/auth'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState()
  const { user, login, logout } = useAuth()

  return (
    <UserContext.Provider value={[user, login, logout, isLogin, setIsLogin]}>
      {children}
    </UserContext.Provider>
  )
}
