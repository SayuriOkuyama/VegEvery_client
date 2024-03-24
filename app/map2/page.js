'use client'

import {
  APIProvider,
  ControlPosition,
  Map,
  Pin,
  MapControl,
  AdvancedMarker,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import Image from 'next/image'

function page() {
  const position = { lat: 35.3501184, lng: 139.4573312 }

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      region="JP"
      language="ja">
      <Map center={position} zoom={18} mapId="46ff2cf41492db8c">
        <AdvancedMarker position={position}>
          <Image
            width={30}
            height={30}
            src={`/logo.png`}
            alt=""
            priority
            className="h-auto"></Image>
        </AdvancedMarker>
        <MapControl position={ControlPosition.TOP_LEFT}>
          .. ここにあるコンポーネントはすべて、Google マップ インスタンスの
          コントロール コンテナーに追加されます ..
        </MapControl>
      </Map>
    </APIProvider>
  )
}

export default page
