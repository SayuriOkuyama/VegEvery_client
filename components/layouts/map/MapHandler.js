// 検索結果によってマップ表示を切り替える

import {
  useMap,
  useMapsLibrary,
  // useAdvancedMarkerRef,
  // AdvancedMarker,
  // InfoWindow,
} from '@vis.gl/react-google-maps'
// import axios from '@/lib/axios'
import { useContext, useEffect, useState } from 'react'
// import { MarkersDataContext } from '@/contexts/markerProvider'
import { SelectedPlaceContext } from '@/contexts/selectedPlaceProvider'

const MapHandler = () => {
  const map = useMap()
  // const [markerRef, marker] = useAdvancedMarkerRef()
  const placesLib = useMapsLibrary('places')
  const [, setPlacesService] = useState(null)
  // const google = window.google
  // const [, setMarkersData] = useContext(MarkersDataContext)
  // const [open, setOpen] = useState(false)
  const [selectedPlace] = useContext(SelectedPlaceContext)

  useEffect(() => {
    if (!placesLib || !map) return

    setPlacesService(new placesLib.PlacesService(map))
  }, [placesLib, map])

  // let infoWindows = []

  // map.addListener('click', function (event) {
  // クリックした場所の緯度経度を取得
  // const clickedLatLng = event.latLng
  // console.log(
  //   'クリックした場所の緯度経度:',
  //   clickedLatLng.lat(),
  //   clickedLatLng.lng(),
  // )
  // console.log(clickedPlace)

  //   const bounds = map.getBounds()

  //   placesService.nearbySearch(
  //     {
  //       bounds: bounds,
  //       // location: clickedLatLng,
  //       // locationRestriction: {
  //       //   circle: {
  //       //     center: {
  //       //       latitude: 37.7937,
  //       //       longitude: -122.3965,
  //       //     },
  //       //     radius: 500.0,
  //       //   },
  //       // },
  //       radius: 50, // 検索範囲の半径（メートル）
  //       includedTypes: ['food', 'restaurant', 'cafe'],
  //       excludedTypes: ['route'],
  //       keyword: '飲食店 カフェ レストラン',
  //       maxResultCount: 10,
  //       languageCode: 'ja',
  //     },
  //     (results, status) => {
  //       if (status === 'OK' && results.length > 0) {
  //         // console.log(results)
  //         // 最初の結果のPlace IDを取得
  //         const placeId = results[0].place_id

  //         // Place Detailsを取得
  //         service.getDetails(
  //           {
  //             placeId: placeId,
  //           },
  //           (place, status) => {
  //             if (status === 'OK') {
  //               // Place Detailsをstateに設定
  //               setClickedPlace(place)
  //               // console.log(place)
  //               placesService.getDetails(
  //                 { placeId: place.place_id, region: 'jp' },
  //                 (place2, status) => {
  //                   // console.log(place2)
  //                 },
  //               )
  //             } else {
  //               console.error('Place Details request failed due to', status)
  //             }
  //           },
  //         )
  //       } else {
  //         console.error('Place search request failed due to', status)
  //       }
  //     },
  //   )
  // })

  // function createMarker(placeData) {
  //   console.log('createMarker')

  //   if (!placeData.geometry || !placeData.geometry.location) return
  //   // お店情報マーカー
  //   // new google.maps.marker.AdvancedMarkerClickEvent
  //   const marker = new google.maps.Marker({
  //     map: map,
  //     position: placeData.geometry.location,
  //     title: placeData.name,
  //     // label: placeData.name?.substr(0, 1),
  //     optimized: false,
  // })
  // const marker = new google.maps.AdvancedMarkerElement({
  //   map: Map,
  //   position: placeData.geometry.location,
  //   title: placeData.name,
  //   label: placeData.name?.substr(0, 1),
  //   optimized: false,
  // })
  // console.log('make')

  // お店情報ウィンドウ
  // infoWindows[0] = new google.maps.InfoWindow()

  // ウィンドウにて表示する情報
  //   const price = placeData.price_level
  //     ? placeData.price_level
  //     : '取得できませんでした'

  //   const infoList = [
  //     placeData.name,
  //     `ランク：${placeData.rating}`,
  //     `金額：${price}`,
  //     placeData.photos && placeData.photos.length > 0
  //       ? `<p><img style="max-width:200px" src="${placeData.photos[0].getUrl()}"/></p>`
  //       : null,
  //   ]

  //   const info = infoList.join('<br>') // 改行区切りで加工して見せる

  //   const div = document.getElementById('marker_point')
  //   div.innerHTML = `
  //   <Drawer open={open} onOpenChange={setOpen}>
  //       {/* <DrawerTrigger></DrawerTrigger> */}
  //       <DrawerContent className="pb-20">
  //         <DrawerHeader>
  //           <DrawerTitle>タイトル</DrawerTitle>
  //           <DrawerDescription>
  //             This action cannot be undone.
  //           </DrawerDescription>
  //         </DrawerHeader>
  //         <DrawerFooter>
  //           <Button>Submit</Button>
  //           <DrawerClose>
  //             <Button variant="outline">Cancel</Button>
  //           </DrawerClose>
  //         </DrawerFooter>
  //       </DrawerContent>
  //     </Drawer>
  //   `

  //   // マーカーにクリックイベントを付与
  //   google.maps.event.addListener(marker, 'click', () => {
  //     console.log('イベント')
  //     // すでに他のマーカーがオープンになっている場合はそのマーカーを閉じる
  //     if (infoWindows[1]) infoWindows[1].close()
  //     if (infoWindows[0] == undefined || infoWindows[0] == null) return
  //     infoWindows[0].close()
  //     infoWindows[0].setContent(info)
  //     infoWindows[0].open(marker.getMap(), marker)
  //     return (
  //       <Drawer open={open} onOpenChange={setOpen}>
  //         {/* <DrawerTrigger></DrawerTrigger> */}
  //         <DrawerContent className="pb-20">
  //           <DrawerHeader>
  //             <DrawerTitle>タイトル</DrawerTitle>
  //             <DrawerDescription>
  //               This action cannot be undone.
  //             </DrawerDescription>
  //           </DrawerHeader>
  //           <DrawerFooter>
  //             <Button>Submit</Button>
  //             <DrawerClose>
  //               <Button variant="outline">Cancel</Button>
  //             </DrawerClose>
  //           </DrawerFooter>
  //         </DrawerContent>
  //       </Drawer>
  //     )
  //   })
  // }

  // const Markers = []

  // 検索結果を中心に表示＆周辺データを取得しマーカー表示
  useEffect(() => {
    if (!map || !selectedPlace) return
    // console.log('handle')
    // console.log(selectedPlace)

    if (selectedPlace.geometry?.viewport) {
      // AutoComplete コンポーネントで取得した place 情報から
      // 東西南北の画面表示エリア取り出し、
      // fitBounds 関数に渡して、その位置情報に画面表示を合わせる
      map.fitBounds(selectedPlace.geometry?.viewport)
      // console.log('handle inner')

      // ↓ の nearbySearch で渡す関数
      // const callback = async result => {
      //   // const callback = async (result, status) => {
      //   // setMarkersData(result)

      //   // const res = await axios.post(
      //   //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/maps`,
      //   //   result,
      //   // )
      //   // console.log(res.data)
      //   // if (status == service.PlacesServiceStatus.OK) {
      //   for (var i = 0; i < result.length; i++) {
      //     // Markers.push(createMarker(result[i]))
      //   }
      //   // }
      // }

      // // ↓ の nearbySearch で渡すオプション
      // var request = {
      //   location: map.getCenter(),
      //   radius: 50,
      //   type: 'food',
      //   keyword: '飲食店 カフェ レストラン', // 検索地点の付近を`keyword`を使って検索する
      // }

      // placesService?.nearbySearch(request, callback)
    }
  }, [map, selectedPlace])

  return
}

export default MapHandler
