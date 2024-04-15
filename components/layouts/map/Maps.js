import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { useState } from 'react'
import CreateCarousel from '@/components/layouts/map/CreateCarousel'
import MapHandler from '@/components/layouts/map/MapHandler'
import CustomMapControl from '@/components/layouts/map/CustomMapControl'
import { SelectedPlaceProvider } from '@/contexts/selectedPlaceProvider'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const App = ({ position }) => {
  const [clickedPlace, setClickedPlace] = useState()
  const [zoom, setZoom] = useState(18)

  const handleClick = e => {
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
        {clickedPlace && <CreateCarousel clickedPlace={clickedPlace} />}
        <SelectedPlaceProvider>
          <CustomMapControl
            setZoom={setZoom}
            setClickedPlace={setClickedPlace}
          />
          <MapHandler />
        </SelectedPlaceProvider>
      </Map>
    </APIProvider>
  )
}

export default App
