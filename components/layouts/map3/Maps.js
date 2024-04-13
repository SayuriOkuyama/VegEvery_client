import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  AdvancedMarker,
} from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'
import Window from '@/components/layouts/map3/window'
import MapHandler from '@/components/layouts/map/MapHandler'
import CustomMapControl from '@/components/layouts/map/CustomMapControl'
import { MarkersDataProvider } from '@/contexts/markerProvider'
import { SelectedMarkerProvider } from '@/contexts/selectedMarkerProvider'
import { SelectedPlaceProvider } from '@/contexts/selectedPlaceProvider'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const App = ({ position }) => {
  const [clickedPlace, setClickedPlace] = useState()
  const [zoom, setZoom] = useState(18)

  const handleClick = e => {
    console.log(e.detail.latLng)
    setClickedPlace(e.detail.latLng)
  }

  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        id="46ff2cf41492db8c"
        mapId="46ff2cf41492db8c"
        defaultCenter={position}
        zoom={zoom}
        disableDefaultUI={true}
        gestureHandling={'greedy'}
        onClick={e => handleClick(e)}>
        {clickedPlace && (
          <Window
            clickedPlace={clickedPlace}
            setClickedPlace={setClickedPlace}
          />
        )}
        <MarkersDataProvider>
          <SelectedMarkerProvider>
            <SelectedPlaceProvider>
              <CustomMapControl setZoom={setZoom} />
              <div id="marker_point" />
              <AdvancedMarker />
              {/* <CustomMarker /> */}
              {/* <MarkerWindow
                clickedPlace={clickedPlace}
                setClickedPlace={setClickedPlace}
              />
              <InfoWindow position={clickedPlace}>Hello World!</InfoWindow> */}
              <MapHandler
              // setClickedPlace={setClickedPlace}
              />
            </SelectedPlaceProvider>
          </SelectedMarkerProvider>
        </MarkersDataProvider>
      </Map>
    </APIProvider>
  )
}

export default App
