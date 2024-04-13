'use client'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // DrawerTrigger,
} from '@/components/ui/drawer'
const containerStyle = {
  width: '100%',
  height: '86vh',
}
const zoom = 18

const Maps = ({ position }) => {
  const [clickedPlace, setClickedPlace] = useState(null)
  const [windowData, setWindowData] = useState(null)
  const placesLib = useMapsLibrary('places')
  function handleMapClick(event) {
    console.log({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
    setClickedPlace({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    })
  }
  console.log(windowData)

  // 検索結果を中心に表示＆周辺データを取得しマーカー表示
  useEffect(() => {
    console.log('useEffect')
    if (!clickedPlace) return

    console.log('clickedPlace')
    console.log(clickedPlace.geometry?.viewport)

    if (clickedPlace.geometry?.viewport) {
      // ↓ の nearbySearch で渡す関数
      const callback = async result => {
        setWindowData(result)
      }

      // ↓ の nearbySearch で渡すオプション
      var request = {
        location: clickedPlace,
        radius: 50,
        type: 'food',
        keyword: '飲食店 カフェ レストラン', // 検索地点の付近を`keyword`を使って検索する
      }

      placesLib?.nearbySearch(request, callback)
    }
  }, [clickedPlace])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        center={position}
        zoom={zoom}
        onClick={handleMapClick}
        mapContainerStyle={containerStyle}>
        {clickedPlace && (
          <Drawer open={clickedPlace || false} onOpenChange={setClickedPlace}>
            <DrawerContent className="pb-20">
              <DrawerHeader>
                <DrawerTitle>タイトル</DrawerTitle>
                <DrawerDescription>{windowData}</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                {/* <Button>Submit</Button>
                <DrawerClose />
                <Button variant="outline">Cancel</Button> */}
                フッター
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Maps
