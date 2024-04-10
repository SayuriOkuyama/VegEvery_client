'use client'

import Logo from '@/components/ui/Logo'
import Maps from '@/components/layouts/map/Maps'
// import { useHandleSearch } from '@/components/layouts/map/SearchMap'
import { useEffect, useState } from 'react'

function page() {
  const [position, setPosition] = useState('')

  // useEffect(() => {
  //   if (!placesService) return

  //   // ...use placesService...
  // }, [placesService])

  // コメダ
  // const position = { lat: 35.2713215, lng: 139.1797686 };

  useEffect(() => {
    // 現在地を取得
    const success = res => {
      // console.log(res)
      setPosition({
        lat: res.coords.latitude,
        lng: res.coords.longitude,
      })
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  //   async function getPlaceDetails() {
  //     // プレイス ID を使用して、新しいプレイス インスタンスを作成
  //     const place = new google.maps.places.Place({
  //       // コメダの place ID
  //       id: 'ChIJc7EbuqOlGWARFlPcoQG-ItU',
  //       requestedLanguage: 'ja',
  //     })

  //     // fetchFields を呼び出して、取得したいフィールド(データの種類)を指定
  //     await place.fetchFields({
  //       fields: [
  //         'displayName', // スポット名
  //         'formattedAddress', // 住所
  //         'websiteURI',
  //         'viewport',
  //         'nationalPhoneNumber',
  //         'regularOpeningHours', // 営業時間
  //         'priceLevel', // 価格帯
  //         'rating', // 評価
  //         'reviews', // クチコミ
  //         'photos',
  //         'location', // 緯度・経度
  //         'servesVegetarianFood', // ベジタリアン料理があるお店
  //       ],
  //     })

  //     console.log(place)
  //     const photoUrl = place.photos[0].getURI()
  //     const encodedName = encodeURI(place.displayName)

  //     // 情報ウィンドウに表示したい HTML
  //     const contentString =
  //       '<div id="content">' +
  //       '<div id="siteNotice">' +
  //       '</div>' +
  //       `<h1 id="firstHeading" class="firstHeading">${place.displayName}</h1>` +
  //       `<img style="height: 200px; width: 200px" src=${photoUrl}>` +
  //       '<div id="bodyContent">' +
  //       `<p>ホームページ：${place.websiteURI}</p>` +
  //       `<p>営業時間：${place.regularOpeningHours.Gg[0]}</p>` +
  //       `<p>評価：${place.rating}</p>` +
  //       `<p>レビュー：${place.reviews[0].Fg}</p>` +
  //       `<a href="https://www.google.com/maps/search/?api=1&query=${encodedName}">Googleマップで見る</a>` +
  //       '</div>' +
  //       '</div>'

  //     // 情報ウィンドウを作成
  //     const infowindow = new google.maps.InfoWindow({
  //       content: contentString,
  //       ariaLabel: 'コメダ',
  //     })

  //     // クリック リスナーを追加し、情報ウィンドウを設定
  //     marker.addListener('gmp-click', () => {
  //       infowindow.open({
  //         anchor: marker,
  //         map,
  //       })
  //     })
  //   }

  //   getPlaceDetails()
  // }

  // initMap()

  return (
    <main className="h-full">
      <div className="fixed top-2 left-2 z-50">
        <Logo size="40" />
      </div>
      <div className="w-full h-full pb-16">
        {position && <Maps position={position} />}
      </div>
    </main>
  )
}

export default page
