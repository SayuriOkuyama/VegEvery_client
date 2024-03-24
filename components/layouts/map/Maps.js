'use client'

import {
  APIProvider,
  ControlPosition,
  Map,
  useMapsLibrary,
  MapControl,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconContext } from 'react-icons' //IconContextをインポート
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import AutoComplete from '@/components/layouts/map/AutoComplete'
import MapHandler from '@/components/layouts/map/MapHandler'

// import { CustomZoomControl } from './CustomZoomControl'
// import ControlPanel from './ControllPanel'

const MapController = () => {
  const map = useMap()
  const placesLibrary = useMapsLibrary('places')
  // const [placesService, setPlacesService] = useState(null)

  useEffect(() => {
    if (!map) return
    console.log(map)
    // do something with the map instance
  }, [map])

  // useEffect(() => {
  //   if (!placesLibrary || !map) return

  //   // placesLibrary がロードされると、
  //   // placeLibrary API オブジェクトを介してライブラリにアクセスできる
  //   setPlacesService(new placesLibrary.PlacesService(map))
  // }, [placesLibrary, map])

  return <>...</>
}

const Maps = ({ position, useHandleSearch }) => {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const [infoWindowShown, setInfoWindowShown] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState()
  const toggleInfoWindow = () =>
    setInfoWindowShown(previousState => !previousState)

  const closeInfoWindow = () => setInfoWindowShown(false)
  const [zoom, setZoom] = useState(18)

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
        disableDefaultUI={true}
        gestureHandling={'greedy'}
        mapId="46ff2cf41492db8c"
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
          <AutoComplete setSelectedPlace={setSelectedPlace} />
        </MapControl>
        {/* <MapControl position={ControlPosition.TOP}>
          <div className="w-dvw flex justify-end items-center mt-6 mr-2">
            <Input
              // ref={refInput}
              type="text"
              placeholder="search"
              className="pr-0 block w-60 h-8"
            />
            <Button
              onClick={() => MapController()}
              className="py-3 px-1 ml-1 border border-button-color h-6 bg-button">
              <IconContext.Provider
                value={{ size: '16px', className: 'p-0 ml-0 mr-0' }}>
                <PiMagnifyingGlassLight className="self-center text-lg" />
              </IconContext.Provider>
            </Button>
          </div>
        </MapControl> */}
        <MapControl position={ControlPosition.BOTTOM}>
          <div className="w-dvw flex justify-end">
            <div>
              <button
                className="block h-8 w-8 mx-2 my-2 text-xl bg-white border"
                onClick={() => setZoom(prev => (prev < 19 ? prev + 1 : 20))}>
                ＋
              </button>
              <button
                className="block h-8 w-8 mx-2 mb-6 text-xl bg-white border"
                onClick={() => setZoom(prev => (prev > 2 ? prev - 1 : 1))}>
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
      <MapHandler selectedPlace={selectedPlace} />
    </APIProvider>
  )
}

export default Maps
