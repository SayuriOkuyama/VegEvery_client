import ArticleCard from '@/components/layouts/ArticleCard'
import { Button } from '@/components/ui/button'
import { PiNotePencilLight } from 'react-icons/pi'
import { PiMagnifyingGlassLight } from 'react-icons/pi'

const page = () => {
  return (
    <main className="pb-24">
      <PiMagnifyingGlassLight className="ml-auto mr-2 text-lg" />
      <h3 className="text-center text-lg font-bold mt-8">
        フードアイテム情報一覧
      </h3>
      <div className="flex justify-between mt-4 mb-1">
        <ul className="flex text-sm items-end ml-2">
          <li>ベジタリアンの種類</li>/<li>タグ</li>/<li>人気の投稿</li>
        </ul>
        <Button className="py-0 pr-2 items-end">
          <div className="flex items-end">
            <PiNotePencilLight className="self-end text-lg" />
            投稿する
          </div>
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 pt-1 pb-8 py-4 gap-4 ">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
      <div className="flex pb-8">ページネーション</div>
    </main>
  )
}

export default page