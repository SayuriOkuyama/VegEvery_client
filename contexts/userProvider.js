'use client'
import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isLogin, setIsLogin] = useState()

  return (
    <UserContext.Provider value={[user, setUser, isLogin, setIsLogin]}>
      {children}
    </UserContext.Provider>
  )
}
