import { Input } from '@/components/ui/input'
import React from 'react'
import { PiMagnifyingGlassLight } from 'react-icons/pi'
import ArticleCard from '../ArticleCard'

const TagWordSort = () => {
  return (
    <>
      <div className="flex my-2">
        <PiMagnifyingGlassLight className="self-center text-lg ml-4 mr-2" />
        <Input />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </>
  )
}

export default TagWordSort
