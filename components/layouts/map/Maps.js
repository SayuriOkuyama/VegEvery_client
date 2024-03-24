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
import ClickHandler from '@/components/layouts/map/ClickHandler'

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
  }, [map, marker])

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
  const [markersData, setMarkersData] = useState()
  console.log(markersData)
  const [clickedPlace, setClickedPlace] = useState(null)

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
        onClick={() => console.log('click')}
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
          <AutoComplete
            setSelectedPlace={setSelectedPlace}
            setMarkersData={setMarkersData}
          />
        </MapControl>
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
        {markersData &&
          markersData.map(markerData => (
            <>
              <AdvancedMarker
                key={markerData.geometry.location}
                position={markerData.geometry.location}
                ref={markerRef}
                // onClick={onMarkerClick}
                label={markerData.name?.substr(0, 1)}
                // onClick={}
              />
              {infoWindowShown && (
                <InfoWindow position={markerData.geometry.location}>
                  <div>
                    <p>{markerData.name}</p>
                    <p>評価：{markerData.rating}</p>
                    <p>価格帯：{markerData.price_level}</p>
                  </div>
                  {/* <Image src={placeData.photos[0].getUrl()}></Image> */}
                </InfoWindow>
              )}
            </>
          ))}
        {/* {clicks.map((latLng, i) => (
          <AdvancedMarker key={i} position={latLng} />
        ))} */}
        <MapHandler
          selectedPlace={selectedPlace}
          setMarkersData={setMarkersData}
          setClickedPlace={setClickedPlace}
        />
        <ClickHandler />
      </Map>
    </APIProvider>
  )
}

export default Maps
