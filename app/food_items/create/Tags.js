'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const Tags = ({ register, control }) => {
  // const { control } = useForm()
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  return (
    <div>
      <h3>タグ</h3>
      <div className="">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div className="flex" key={field.id}>
            <input
              className="border"
              type="text"
              placeholder="無添加"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`tags.${index}.tag`)}
            />
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            {index !== 0 && (
              <button
                className="border"
                type="button"
                onClick={() => remove(index)}>
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border mt-4 mx-auto block px-2 bg-button border-button-color rounded-full text-sm"
          type="button"
          onClick={() => append({ tag: '' })}>
          タグを追加
        </button>
      </div>
    </div>
  )
}
export default Tags