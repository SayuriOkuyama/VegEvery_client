'use client'
import { createContext, useState } from 'react'

export const SelectedMarkerContext = createContext()

export const SelectedMarkerProvider = ({ children }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)

  return (
    <SelectedMarkerContext.Provider value={[selectedMarker, setSelectedMarker]}>
      {children}
    </SelectedMarkerContext.Provider>
  )
}
