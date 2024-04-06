'use client'
import { useFieldArray } from 'react-hook-form'

const Items = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control,
  })

  return (
    <div className="bg-green py-4 container">
      <div className="flex">
        <h3 className="mb-4">アイテム</h3>
      </div>
      <div className="space-y-2">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div key={field.id}>
            <hr className="" />
            <div className="space-y-4 py-2" key={field.id}>
              <label className="block">
                アイテム名
                <input
                  className="border block w-full mt-1"
                  type="text"
                  placeholder="ヴィーガンヌードル 醤油味"
                  // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                  {...register(`items.${index}.name`)}
                />
              </label>
              <label className="block my-1">
                購入できる場所
                <input
                  className="border block w-full mt-1"
                  type="text"
                  placeholder="〇〇ネットショップ"
                  // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                  {...register(`items.${index}.where_to_buy`)}
                />
              </label>
              <label className="block py-1">
                参考価格
                <input
                  className="border block w-full mt-1 px-1"
                  type="text"
                  placeholder="1,980円 / 500g"
                  // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                  {...register(`items.${index}.price`)}
                />
              </label>
              {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
              {index !== 0 && (
                <button
                  className="border block ml-auto mr-0 bg-white w-4 h-4 text-center leading-none text-sm"
                  type="button"
                  onClick={() => remove(index)}>
                  ✕
                </button>
              )}
            </div>
            {errors.items &&
              errors.items[index] &&
              errors.items[index].name && (
                <div className="text-red-400">
                  {errors.items[index].name.message}
                </div>
              )}
            {errors.items &&
              errors.items[index] &&
              errors.items[index].where_to_buy && (
                <div className="text-red-400">
                  {errors.items[index].where_to_buy.message}
                </div>
              )}
            {errors.items &&
              errors.items[index] &&
              errors.items[index].price && (
                <div className="text-red-400">
                  {errors.items[index].price.message}
                </div>
              )}
          </div>
        ))}
        <hr className="" />
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border mt-4 block mx-auto px-2 rounded-full bg-button border-button-color text-sm"
          type="button"
          onClick={() => append({ name: '', place: '', price: '' })}>
          アイテムを追加
        </button>
      </div>
    </div>
  )
}
export default Items
