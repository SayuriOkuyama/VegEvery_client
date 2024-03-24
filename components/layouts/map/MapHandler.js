import {
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarker,
  InfoWindow,
} from '@vis.gl/react-google-maps'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'

const MapHandler = ({
  selectedPlace,
  setMarkersData,
  clickedPlace,
  setClickedPlace,
}) => {
  const map = useMap()
  const places = useMapsLibrary('places')
  const [markerRef, marker] = useAdvancedMarkerRef()
  const placesLib = useMapsLibrary('places')
  const [placesService, setPlacesService] = useState(null)

  useEffect(() => {
    if (!placesLib || !map) return

    setPlacesService(new placesLib.PlacesService(map))
  }, [placesLib, map])

  map.addListener('click', function (event) {
    // クリックした場所の緯度経度を取得
    const clickedLatLng = event.latLng
    // console.log(
    //   'クリックした場所の緯度経度:',
    //   clickedLatLng.lat(),
    //   clickedLatLng.lng(),
    // )
    // console.log(clickedPlace)

    // Google Places APIを使用してPlace Detailsを取得
    // const service = new window.google.maps.places.PlacesService(map)

    placesService.nearbySearch(
      {
        location: clickedLatLng,
        // locationRestriction: {
        //   circle: {
        //     center: {
        //       latitude: 37.7937,
        //       longitude: -122.3965,
        //     },
        //     radius: 500.0,
        //   },
        // },
        radius: 50, // 検索範囲の半径（メートル）
        includedTypes: ['food', 'restaurant', 'cafe'],
        excludedTypes: ['route'],
        keyword: '飲食店 カフェ レストラン',
        maxResultCount: 10,
        languageCode: 'ja',
      },
      (results, status) => {
        if (status === 'OK' && results.length > 0) {
          // console.log(results)
          // 最初の結果のPlace IDを取得
          const placeId = results[0].place_id

          // Place Detailsを取得
          service.getDetails(
            {
              placeId: placeId,
            },
            (place, status) => {
              if (status === 'OK') {
                // Place Detailsをstateに設定
                setClickedPlace(place)
                // console.log(place)
                placesService.getDetails(
                  { placeId: place.place_id, region: 'jp' },
                  (place2, status) => {
                    // console.log(place2)
                  },
                )
              } else {
                console.error('Place Details request failed due to', status)
              }
            },
          )
        } else {
          console.error('Place search request failed due to', status)
        }
      },
    )
  })

  function createMarker(placeData) {
    if (!placeData.geometry || !placeData.geometry.location) return
    // お店情報マーカー
    // const marker = new google.maps.Marker({
    //   map: Map,
    //   position: placeData.geometry.location,
    //   title: placeData.name,
    //   label: placeData.name?.substr(0, 1),
    //   optimized: false,
    // })
    console.log('make')
    console.log(placeData.geometry.location)

    const onMarkerClick = () => {
      console.log('marker click')
      // if (infoWindows[1]) infoWindows[1].close() // マーカーの詳細表示を複数表示をさせない
      // if (infoWindows[0] == undefined || infoWindows[0] == null) return
      // infoWindows[0].close()
      // infoWindows[0].setContent(info)
      // infoWindows[0].open(marker.getMap(), marker)
    }

    return (
      <>
        <AdvancedMarker
          position={{ lat: 35.2713215, lng: 139.1797686 }}
          // place={{
          //   placeId: placeData.place_id,
          //   location: placeData.geometry.location,
          // }}
          ref={markerRef}
          onClick={onMarkerClick}
          label={placeData.name?.substr(0, 1)}
        />
        {/* {infoWindowShown && ( */}
        <InfoWindow anchor={marker}>
          <div>
            <p>{placeData.name}</p>
            <p>評価：{placeData.price_level}</p>
            <p>価格帯：{placeData.name}</p>
            <p>{placeData.photos}</p>
          </div>
          {/* <Image src={placeData.photos[0].getUrl()}></Image> */}
        </InfoWindow>
        {/* )} */}
      </>
    )
  }
  const Markers = []

  useEffect(() => {
    if (!map || !selectedPlace) return

    // AutoComplete コンポーネントで取得した place 情報から
    // 東西南北の画面表示エリア取り出し、
    // fitBounds 関数に渡して、その位置情報に画面表示を合わせる
    if (selectedPlace.geometry?.viewport) {
      map.fitBounds(selectedPlace.geometry?.viewport)

      const callback = async (result, status) => {
        console.log(result)
        setMarkersData(result)
        // const res = await axios.post(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/maps`,
        //   result,
        // )
        // console.log(res.data)
        // // if (status == service.PlacesServiceStatus.OK) {
        // for (var i = 0; i < result.length; i++) {
        //   Markers.push(createMarker(result[i]))
        // }
        // // }
      }

      var request = {
        location: map.getCenter(),
        // locationBias: {
        //   circle: {
        //     center: map.getCenter(),
        //     radius: 50,
        //   },
        // },
        radius: 50,
        type: 'food',
        // includedTypes: ['food', 'restaurant', 'cafe'],
        // excludedTypes: ['route'],
        keyword: '飲食店 カフェ レストラン', // 検索地点の付近を`keyword`を使って検索する
      }

      placesService?.nearbySearch(request, callback)
    }
  }, [map, selectedPlace])

  return <div>{Markers && Markers.map(marker => marker)}</div>
}

export default MapHandler
