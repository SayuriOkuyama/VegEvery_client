'use client'
// src/components/GoogleMap.tsx
import {
  GoogleMap,
  useLoadScript,
  // AdvancedMarker,
} from '@react-google-maps/api'

// 初期化用の定数
// const INITIALIZE_LAT = 35.68238 // 緯度
// const INITIALIZE_LNG = 139.76556 // 経度
// const INITIALIZE_ZOOM = 15 // ズームレベル

// const INITIALIZE_MAP_WIDTH = '100%' // 地図の幅
// const INITIALIZE_MAP_HEIGHT = '400px' // 地図の高さ

const libraries = ['places']

// マップの大きさ
const containerStyle = {
  width: '100%',
  height: '86vh',
}

// const center = {
//   lat: 34.7293466708865,
//   lng: 135.49939605607292,
// }

const zoom = 13

const Map = ({ position }) => {
  // const mapRef = useRef()
  // const [map, setMap] = useState() | null

  // useEffect(() => {
  //   if (!mapRef.current) return

  //   const initializedMap = new google.maps.Map(mapRef.current, {
  //     center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
  //     zoom: INITIALIZE_ZOOM,
  //   })

  //   setMap(initializedMap)
  // }, [])
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) {
    return <div>Error loading maps</div>
  }

  if (!isLoaded) {
    return <div>Loading maps</div>
  }

  return (
    // <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={zoom}>
      {/* <AdvancedMarker position={position} /> */}
    </GoogleMap>
    // </LoadScript>
  )
}

export default Map
