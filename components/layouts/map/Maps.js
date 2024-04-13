'use client'

import {
  APIProvider,
  Map,
  // useMapsLibrary,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  // useMap,
} from '@vis.gl/react-google-maps'
// import Image from 'next/image'
import { useState } from 'react'
import MapHandler from '@/components/layouts/map/MapHandler'
import CustomMapControl from '@/components/layouts/map/CustomMapControl'
import CustomMarker from '@/components/layouts/map/CustomMarker'
import { MarkersDataProvider } from '@/contexts/markerProvider'
import { SelectedMarkerProvider } from '@/contexts/selectedMarkerProvider'
import { SelectedPlaceProvider } from '@/contexts/selectedPlaceProvider'
import MarkerWindow from '@/components/layouts/map/MarkerWindow'

const Maps = () => {
  // const [clickedPlace, setClickedPlace] = useState(null)
  // const [zoom, setZoom] = useState(18)

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      region="JP"
      language="ja">
      <Map
        onClick={() => console.log('MapOnClick')}
        defaultCenter={{
          lat: 35.66581861,
          lng: 139.72951166,
        }}
        // defaultZoom={zoom}
        zoom={18}
        disableDefaultUI={true}
        // gestureHandling={'greedy'}
        mapId="46ff2cf41492db8c"
        // onZoomChanged={ev => setZoom(ev.detail.zoom)}
      >
        {/* <MarkersDataProvider>
          <SelectedMarkerProvider>
            <SelectedPlaceProvider>
              <CustomMapControl setZoom={setZoom} /> */}
        {/* <div id="marker_point" /> */}
        {/* <CustomMarker /> */}
        {/* <MarkerWindow
                clickedPlace={clickedPlace}
                setClickedPlace={setClickedPlace}
              />
              <InfoWindow position={clickedPlace}>Hello World!</InfoWindow>
              <MapHandler
              // setClickedPlace={setClickedPlace}
              />
            </SelectedPlaceProvider>
          </SelectedMarkerProvider>
        </MarkersDataProvider> */}
      </Map>
    </APIProvider>
  )
}

export default Maps
