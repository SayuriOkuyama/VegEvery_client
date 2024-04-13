import { InfoWindow } from '@vis.gl/react-google-maps'
import { SelectedPlaceContext } from '@/contexts/selectedPlaceProvider'
import { useContext } from 'react'

const MarkerWindow = ({ clickedPlace, setClickedPlace }) => {
  const [selectedPlace] = useContext(SelectedPlaceContext)

  console.log('clicked')
  if (!selectedPlace) {
    console.log('!selectedPlace')

    return null
  }

  return (
    <>
      {clickedPlace && (
        <InfoWindow position={selectedPlace}>
          <div>
            <h2>Place Name</h2>
            <p>Place description</p>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

export default MarkerWindow
