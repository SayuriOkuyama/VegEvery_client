'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const Materials = ({ register, control }) => {
  // const { register, control } = useForm({
  //   defaultValues: {
  //     materials: [{ material: '', quantity: '', unit: '' }],
  //   },
  // })
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
        </h3>
      </div>
      <div className="space-y-2">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div className="flex space-x-2" key={field.id}>
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
              <option value="dog">g</option>
              <option value="cat">mg</option>
              <option value="hamster">L</option>
              <option value="parrot">mL</option>
              <option value="spider">cc</option>
              <option value="goldfish">個</option>
              <option value="goldfish">本</option>
              <option value="goldfish">片</option>
              <option value="goldfish">枚</option>
              <option value="goldfish">杯（小さじ）</option>
              <option value="goldfish">杯（大さじ）</option>
              <option value="goldfish">カップ</option>
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
