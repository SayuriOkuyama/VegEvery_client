'use client'
import { useFieldArray } from 'react-hook-form'

const EditTags = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  return (
    <div>
      <h3>タグ</h3>
      <div className="">
        {fields.map((field, index) => (
          <div className="flex" key={field.id}>
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
        ))}
      </div>
      <div>
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
export default EditTags
