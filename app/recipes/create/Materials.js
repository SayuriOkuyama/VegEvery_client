'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const Materials = ({ register, control, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'materials',
    control,
  })
  const materials = getValues('materials')
  console.log(materials)

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
        </h3>
      </div>
      <div className="space-y-2">
        {/* 一位に特定するために map する際に index を付与する */}
        {Object.keys(materials).map((material, index) => (
          <div className="flex space-x-2" key={material.id}>
            <input
              className="border block w-20"
              type="text"
              placeholder="材料名"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`materials.${index}.material`)}
            />
            <input
              className="border block w-12"
              type="text"
              placeholder="100"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`materials.${index}.quantity`)}
            />
            <select
              className="border block w-12"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`materials.${index}.unit`)}>
              <option value=""></option>
              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="L">L</option>
              <option value="mL">mL</option>
              <option value="cc">cc</option>
              <option value="個">個</option>
              <option value="本">本</option>
              <option value="片">片</option>
              <option value="枚">枚</option>
              <option value="杯（小さじ）">杯（小さじ）</option>
              <option value="杯（大さじ）">杯（大さじ）</option>
              <option value="カップ">カップ</option>
            </select>
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            {index !== 0 && (
              <button
                className="border ml-1"
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
          className="border mt-4 block mx-auto px-2 rounded-full bg-button border-button-color text-sm"
          type="button"
          onClick={() => append({ material: '', quantity: '', unit: '' })}>
          材料を追加
        </button>
      </div>
    </div>
  )
}
export default Materials
