'use client'

// import React, { useCallback } from 'react'
import {
  APIProvider,
  ControlPosition,
  Map,
  // useMapsLibrary,
  MapControl,
  // AdvancedMarker,
  // InfoWindow,
  // useAdvancedMarkerRef,
  // useMap,
} from '@vis.gl/react-google-maps'
// import Image from 'next/image'
import { useState } from 'react'
import AutoComplete from '@/components/layouts/map/AutoComplete'
import MapHandler from '@/components/layouts/map/MapHandler'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   // DrawerTrigger,
// } from '@/components/ui/drawer'
// import { Button } from '@/components/ui/button'

// const MapController = () => {
//   const map = useMap()
//   // const placesLibrary = useMapsLibrary('places')
//   // const [placesService, setPlacesService] = useState(null)

//   useEffect(() => {
//     if (!map) return
//     // console.log(map)
//     // do something with the map instance
//   }, [map, marker])

//   // useEffect(() => {
//   //   if (!placesLibrary || !map) return

//   //   // placesLibrary がロードされると、
//   //   // placeLibrary API オブジェクトを介してライブラリにアクセスできる
//   //   setPlacesService(new placesLibrary.PlacesService(map))
//   // }, [placesLibrary, map])

//   return <>...</>
// }

const Maps = ({ position }) => {
  // const [markerRef, marker] = useAdvancedMarkerRef()
  // const [infoWindowShown, setInfoWindowShown] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState()
  // const [markersData, setMarkersData] = useState()
  // console.log(markersData)
  // const [clickedPlace, setClickedPlace] = useState(null)
  // const [selectedMarker, setSelectedMarker] = useState(null)
  // const [open, setOpen] = useState(false)

  // const toggleInfoWindow = () => {
  //   console.log('toggleInfoWindow!!')
  //   setInfoWindowShown(previousState => !previousState)
  // }
  // const closeInfoWindow = () => {
  //   console.log('closeInfoWindow!!')
  //   setInfoWindowShown(false)
  // }

  // const closeInfoWindow = () => setInfoWindowShown(false)
  const [zoom, setZoom] = useState(18)

  // const handleMarkerClick = useCallback(
  //   markerData => {
  //     console.log('handleMarkerClick!!')
  //     setSelectedMarker(markerData)
  //     setOpen(true)
  //   },
  //   [selectedMarker],
  // )

  // console.log(zoom)
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
        <div className="bg-black">
          {/* <AdvancedMarker
            position={position}
            ref={markerRef}
            onClick={() => handleMarkerClick()}
            // onClick={toggleInfoWindow}
          /> */}
        </div>
        {/* <Image
            width={30}
            height={30}
            src={`/logo.png`}
            alt=""
            priority
            className="h-auto"></Image> */}
        {/* {infoWindowShown && (
          // <InfoWindow anchor={marker} onCloseClick={closeInfoWindow}>
          //   <div>
          //     <p>お店の名前</p>
          //     <p>評価：★★★★</p>
          //     <p>お店の名前</p>
          //     <p>評価：★★★★</p>
          //   </div>
          // </InfoWindow>
          <Drawer open={open} onOpenChange={setOpen}>
            {/* <DrawerTrigger></DrawerTrigger> */}
        {/* <DrawerContent className="pb-20">
              <DrawerHeader>
                <DrawerTitle>
                  {selectedMarker && selectedMarker.name}
                </DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )} */}
        <MapControl position={ControlPosition.TOP}>
          <AutoComplete
            setSelectedPlace={setSelectedPlace}
            // setMarkersData={setMarkersData}
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
        {/* <div id="marker_point"></div> */}
        {/* {markersData &&
          markersData.map(markerData => (
            <React.Fragment key={markerData.place_id}>
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="pb-20">
                  <DrawerHeader>
                    <DrawerTitle>
                      {selectedMarker && selectedMarker.name}
                    </DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <AdvancedMarker
                position={markerData.geometry.location}
                label={markerData.name?.substr(0, 1)}
                onClick={() => handleMarkerClick(markerData)}
              />
            </React.Fragment>
          ))} */}
        <MapHandler
          selectedPlace={selectedPlace}
          // setMarkersData={setMarkersData}
          // setClickedPlace={setClickedPlace}
        />
      </Map>
    </APIProvider>
  )
}

export default Maps
