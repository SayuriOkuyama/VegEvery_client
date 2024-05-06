'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TopMapSection = () => {
  return (
    <section className="pt-8 sm:pt-16 max-w-4xl mx-auto">
      <h3 className="text-center text-lg font-bold sm:text-start sm:text-3xl">
        レストラン Map
      </h3>
      <div className="mt-8 w-full h-80 bg-slate-50 flex justify-center items-center max-w-lg mx-auto">
        <Link href={'/map'} className="flex items-center relative bg-map">
          <Button className="mx-auto bg-button border-button-color">
            現在地から探す
          </Button>
        </Link>
      </div>
    </section>
  )
}

export default TopMapSection
