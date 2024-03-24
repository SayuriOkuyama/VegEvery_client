import { useMap } from '@vis.gl/react-google-maps'
import { useEffect } from 'react'

const MapHandler = ({ selectedPlace }) => {
  const map = useMap()

  useEffect(() => {
    if (!map || !selectedPlace) return

    // AutoComplete コンポーネントで取得した place 情報から
    // 東西南北の画面表示エリア取り出し、
    // fitBounds 関数に渡して、その位置情報に画面表示を合わせる
    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry?.viewport)
    }
  }, [map, selectedPlace])

  return null
}

export default MapHandler
