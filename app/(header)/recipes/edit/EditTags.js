'use client'
import { useFieldArray } from 'react-hook-form'

const EditTags = ({ register, control, errors }) => {
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
          <div key={field.id}>
            <div className="flex">
              <input
                className="border"
                type="text"
                // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                {...register(`tags.${index}.name`)}
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
            {errors.tags && errors.tags[index].tag && (
              <div className="text-red-400">
                {errors.tags[index].name.message}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border mt-4 mx-auto block px-8 py-2 bg-button border-button-color rounded-full text-sm"
          type="button"
          onClick={() => append({ name: '' })}>
          タグを追加
        </button>
      </div>
    </div>
  )
}
export default EditTags
