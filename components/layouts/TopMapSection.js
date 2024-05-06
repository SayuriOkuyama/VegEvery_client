'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TopMapSection = () => {
  return (
    <section className="pt-8 sm:pt-16 sm:mb-32 max-w-4xl mx-auto">
      <h3 className="text-center text-lg font-bold sm:text-start sm:text-3xl">
        レストラン Map
      </h3>
      <div className="mt-8 w-full h-80 bg-slate-50 max-w-lg mx-auto relative">
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-map">
          <Link
            href={'/map'}
            className="w-full h-full flex items-center relative bg-[#ffffff70]">
            <Button className="mx-auto bg-button border-button-color">
              現在地から探す
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopMapSection
