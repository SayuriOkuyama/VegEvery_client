'use client'

import {
  APIProvider,
  ControlPosition,
  Map,
  Pin,
  MapControl,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconContext } from 'react-icons' //IconContextをインポート
import { PiMagnifyingGlassLight } from 'react-icons/pi'

// import { CustomZoomControl } from './CustomZoomControl'
// import ControlPanel from './ControllPanel'

const Maps = () => {
  const [position, setPosition] = useState({
    lat: 35.2713215,
    lng: 139.1797686,
  })

  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)

  useEffect(() => {
    const success = res => {
      console.log(res)
      setPosition({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      })
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  const toggleInfoWindow = () =>
    setInfoWindowShown(previousState => !previousState)

  const closeInfoWindow = () => setInfoWindowShown(false)
  const [zoom, setZoom] = useState(18)

  const handleSearch = () => {
    // const search = refInput.current.value
    // router.push(`/${path}?type=${type}&search=${search}&page=1`)
  }
  console.log(zoom)
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      region="JP"
      language="ja">
      <Map
        defaultCenter={position}
        defaultZoom={zoom}
        zoom={zoom}
        // center={position}
        disableDefaultUI={true}
        gestureHandling={'greedy'}
        mapId="46ff2cf41492db8c"
        // zoom={zoom}
        onZoomChanged={ev => setZoom(ev.detail.zoom)}>
        <AdvancedMarker
          position={position}
          ref={markerRef}
          onClick={toggleInfoWindow}
        />
        {/* <Image
            width={30}
            height={30}
            src={`/logo.png`}
            alt=""
            priority
            className="h-auto"></Image> */}
        {infoWindowShown && (
          <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
            You can drag and drop me.
          </InfoWindow>
        )}
        <MapControl position={ControlPosition.TOP}>
          <div className="flex justify-center items-center mt-4">
            <Input
              // ref={refInput}
              type="text"
              placeholder="search"
              className="pr-0 block w-64 h-8"
            />
            <Button
              onClick={() => handleSearch()}
              className="py-3 px-1 ml-1 border border-button-color h-6 bg-button">
              <IconContext.Provider
                value={{ size: '16px', className: 'p-0 ml-0 mr-0' }}>
                <PiMagnifyingGlassLight className="self-center text-lg" />
              </IconContext.Provider>
            </Button>
          </div>
        </MapControl>
        <MapControl position={ControlPosition.BOTTOM}>
          <div className="w-dvw flex justify-end">
            <div>
              <button
                className="block h-8 w-8 mx-2 my-2 text-xl bg-white border"
                onClick={() =>
                  setZoom(prev => {
                    console.log('+')
                    console.log(prev++)
                    console.log(zoom)
                    return prev++
                  })
                }>
                ＋
              </button>
              <button
                className="block h-8 w-8 mx-2 mb-6 text-xl bg-white border"
                onClick={() =>
                  setZoom(prev => {
                    console.log('-')
                    console.log(prev--)
                    console.log(zoom)
                    return prev--
                  })
                }>
                ー
              </button>
            </div>
          </div>
        </MapControl>
        {/* <CustomZoomControl
          controlPosition={controlPosition}
          zoom={zoom}
          onZoomChange={zoom => setZoom(zoom)}
        /> */}
      </Map>
    </APIProvider>
  )
}

export default Maps
