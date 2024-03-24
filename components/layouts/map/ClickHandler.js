import {
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps'
import axios from '@/lib/axios'
import { useEffect } from 'react'

const ClickHandler = ({ selectedPlace, setMarkersData }) => {
  const map = useMap()
  const places = useMapsLibrary('places')
  const [markerRef, marker] = useAdvancedMarkerRef()

  map.addListener('click', event => {
    // console.log(event.latLng)
    var marker = new google.maps.Marker()
    marker.setPosition(
      new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
    )
    marker.addListener('click', function () {
      // マーカーをクリックしたとき
      infoWindow.open(map, marker) // 吹き出しの表示
    })
    marker.setMap(map)
  })

  return <></>
}

export default ClickHandler
