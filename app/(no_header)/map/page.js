'use client'

import Logo from '@/components/ui/Logo'
import Maps from '@/components/layouts/map/Maps'

import { useEffect, useState } from 'react'

function page() {
  const [position, setPosition] = useState('')

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
