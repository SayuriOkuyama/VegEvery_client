import React from 'react'
import { useMap } from '@vis.gl/react-google-maps'

const SeachMap = () => {
  return <div>SeachMap</div>
}

// useEffect(() => {
//   if (!placesLibrary || !map) return

//   // placesLibrary がロードされると、
//   // placeLibrary API オブジェクトを介してライブラリにアクセスできる
//   setPlacesService(new placesLibrary.PlacesService(map))
// }, [placesLibrary, map])

export const useHandleSearch = () => {
  const map = useMap()
  console.log(map)
  // const search = refInput.current.value
  // router.push(`/${path}?type=${type}&search=${search}&page=1`)
}
