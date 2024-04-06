'use client'
import { useFieldArray } from 'react-hook-form'

const Tags = ({ register, control, errors }) => {
  // const { control } = useForm()
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  return (
    <div>
      <h3>タグ</h3>
      <div className="">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex">
              <input
                className="border"
                type="text"
                {...register(`tags.${index}.name`)}
              />
              {index !== 0 && (
                <button
                  className="border"
                  type="button"
                  onClick={() => remove(index)}>
                  ✕
                </button>
              )}
            </div>
            {errors.tags && errors.tags[index].name && (
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
          className="border mt-4 mx-auto block px-2 bg-button border-button-color rounded-full text-sm"
          type="button"
          onClick={() => append({ name: '' })}>
          タグを追加
        </button>
      </div>
    </div>
  )
}
export default Tags
