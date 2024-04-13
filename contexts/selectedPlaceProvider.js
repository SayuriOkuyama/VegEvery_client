'use client'
import { createContext, useState } from 'react'

export const SelectedPlaceContext = createContext()

export const SelectedPlaceProvider = ({ children }) => {
  const [selectedPlace, setSelectedPlace] = useState()

  return (
    <SelectedPlaceContext.Provider value={[selectedPlace, setSelectedPlace]}>
      {children}
    </SelectedPlaceContext.Provider>
  )
}
