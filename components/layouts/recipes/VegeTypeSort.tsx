import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import ArticleCard from '../ArticleCard'

const VegeTypeSort = () => {
  return (
    <Tabs defaultValue="V" className="flex flex-col">
      <TabsList className="">
        <TabsTrigger
          value="V"
          className="rounded-full bg-color-v opacity-60 mr-1 text-xs">
          V
        </TabsTrigger>
        <TabsTrigger
          value="Ori"
          className="rounded-full bg-color-ori opacity-60 mr-1 text-sm w-8">
          Ori
        </TabsTrigger>
        <TabsTrigger
          value="Ovo"
          className="rounded-full bg-color-ovo opacity-60 mr-1 text-sm w-8">
          Ovo
        </TabsTrigger>
        <TabsTrigger
          value="Psc"
          className="rounded-full bg-color-psc opacity-60 mr-1 text-sm w-8">
          Psc
        </TabsTrigger>
        <TabsTrigger
          value="Lct"
          className="rounded-full bg-color-lct opacity-60 mr-1 text-sm w-8">
          Lct
        </TabsTrigger>
        <TabsTrigger
          value="Pol"
          className="rounded-full bg-color-pol opacity-60 mr-1 text-sm w-8">
          Pol
        </TabsTrigger>
        <TabsTrigger
          value="flu"
          className="rounded-full bg-color-flu opacity-60 text-sm w-8">
          Flu
        </TabsTrigger>
      </TabsList>
      <TabsContent value="V">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Ori">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Ovo">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Psc">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Lct">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Lct">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="Pol">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
      <TabsContent value="flu">
        <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default VegeTypeSort
