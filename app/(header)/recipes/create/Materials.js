'use client'
import { useFieldArray } from 'react-hook-form'

const Materials = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'materials',
    control,
  })

  return (
    <div className="bg-green py-4 container">
      <div className="flex">
        <h3 className="mb-2">
          材料（
          <input
            type="text"
            placeholder="２〜３"
            className="w-12 border"
            {...register('servings')}
          />
          ）人前
          {errors.servings && (
            <div className="text-red-400">{errors.servings.message}</div>
          )}
        </h3>
      </div>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div className="" key={field.id}>
            <div className="flex space-x-2">
              <input
                className="border block w-20"
                type="text"
                placeholder="材料名"
                {...register(`materials.${index}.name`)}
              />
              <input
                className="border block w-12"
                type="text"
                placeholder="100"
                {...register(`materials.${index}.quantity`)}
              />
              <select
                className="border block w-12"
                {...register(`materials.${index}.unit`)}>
                <option value="null">単位なし</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="cc">cc</option>
                <option value="個">個</option>
                <option value="袋">袋</option>
                <option value="本">本</option>
                <option value="片">片</option>
                <option value="枚">枚</option>
                <option value="杯（小さじ）">杯（小さじ）</option>
                <option value="杯（大さじ）">杯（大さじ）</option>
                <option value="カップ">カップ</option>
              </select>
              {index !== 0 && (
                <button
                  className="border ml-1"
                  type="button"
                  onClick={() => remove(index)}>
                  ✕
                </button>
              )}
            </div>
            {errors.materials &&
              errors.materials[index] &&
              errors.materials[index].name && (
                <div className="text-red-400">
                  {errors.materials[index].name.message}
                </div>
              )}
            {errors.materials &&
              errors.materials[index] &&
              errors.materials[index].quantity && (
                <div className="text-red-400">
                  {errors.materials[index].quantity.message}
                </div>
              )}
            {errors.materials &&
              errors.materials[index] &&
              errors.materials[index].unit && (
                <div className="text-red-400">
                  {errors.materials[index].unit.message}
                </div>
              )}
          </div>
        ))}
      </div>
      <div>
        <button
          className="border mt-4 block mx-auto px-2 rounded-full bg-button border-button-color text-sm"
          type="button"
          onClick={() => append({ material: '', quantity: '', unit: 'null' })}>
          材料を追加
        </button>
      </div>
    </div>
  )
}
export default Materials
