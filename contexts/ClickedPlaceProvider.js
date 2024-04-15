'use client'
import { createContext, useState } from 'react'

export const ClickedPlaceContext = createContext()

export const ClickedPlaceProvider = ({ children }) => {
  const [clickedPlace, setClickedPlace] = useState()

  return (
    <ClickedPlaceContext.Provider value={[clickedPlace, setClickedPlace]}>
      {children}
    </ClickedPlaceContext.Provider>
  )
}
