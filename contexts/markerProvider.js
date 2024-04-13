'use client'
import { createContext, useState } from 'react'

export const MarkersDataContext = createContext()

export const MarkersDataProvider = ({ children }) => {
  const [markersData, setMarkersData] = useState()

  return (
    <MarkersDataContext.Provider value={[markersData, setMarkersData]}>
      {children}
    </MarkersDataContext.Provider>
  )
}
