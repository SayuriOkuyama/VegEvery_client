'use client'
import { useFieldArray } from 'react-hook-form'

const EditTags = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  return (
    <div>
      <h3 className="bold sm:text-xl">タグ</h3>
      <div className="">
        {fields.map((field, index) => (
          <div className="flex" key={field.id}>
            <div>
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
