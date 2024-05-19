'use client'

import { createContext, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const { user, login, logout } = useAuth()

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [user])

  return (
    <UserContext.Provider value={[user, login, logout, isLogin, setIsLogin]}>
      {children}
    </UserContext.Provider>
  )
}
