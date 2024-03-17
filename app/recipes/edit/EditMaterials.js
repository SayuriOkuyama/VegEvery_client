'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const EditMaterials = ({ register, control, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'materials',
    control,
  })
  const materials = getValues('materials')
  // console.log(materials)

  return (
    <div className="bg-green py-4 container">
      <div className="flex">
        <h3 className="mb-2">
          材料（
          <input
            type="text"
            placeholder="2~3"
            className="w-8 border"
            {...register('servings')}
          />
          ）人前
        </h3>
      </div>
      <div className="space-y-2">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          // {Object.keys(materials).map((material, index) => (
          <div className="flex justify-between items-center" key={field.id}>
            <input
              className="border block w-40"
              type="text"
              placeholder="材料名"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`materials.${index}.name`)}
            />
            <div className="flex items-center">
              <input
                className="border block w-8"
                type="text"
                placeholder="100"
                // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                {...register(`materials.${index}.quantity`)}
              />
              <select
                className="border text-sm text-end"
                // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                {...register(`materials.${index}.unit`)}>
                <option value="なし">(単位)</option>
                <option value="g">g</option>
                <option value="mg">mg</option>
                <option value="L">L</option>
                <option value="mL">mL</option>
                <option value="cc">cc</option>
                <option value="個">個</option>
                <option value="本">本</option>
                <option value="片">片</option>
                <option value="枚">枚</option>
                <option value="杯（小さじ）">杯(小さじ)</option>
                <option value="杯（大さじ）">杯(大さじ)</option>
                <option value="カップ">カップ</option>
              </select>
              {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
              {index !== 0 ? (
                <button
                  className="border block ml-1 bg-white w-4 h-4 text-center leading-none text-sm"
                  type="button"
                  onClick={() => remove(index)}>
                  ✕
                </button>
              ) : (
                <div className="w-4 h-4 ml-1"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border mt-4 block mx-auto px-2 rounded-full bg-button border-button-color text-sm"
          type="button"
          onClick={() => append({ material: '', quantity: '', unit: '' })}>
          材料を追加
        </button>
      </div>
    </div>
  )
}
export default EditMaterials
