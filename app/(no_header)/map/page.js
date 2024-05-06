'use client'

import Logo from '@/components/ui/Logo'
import Maps from '@/components/layouts/map/Maps'
import Header from '@/components/layouts/Header'
import { Suspense } from 'react'
import Loading from '@/components/layouts/Loading'
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
    <>
      <div className="hidden sm:block">
        <Header />
      </div>
      <main className="h-full">
        <Suspense fallback={<Loading />}>
          <div className="fixed top-2 left-2 z-50 sm:hidden">
            <Logo size="40" />
          </div>
          <div className="w-full h-full pb-16">
            {position && <Maps position={position} />}
          </div>
        </Suspense>
      </main>
    </>
  )
}

export default page
