'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const Steps = ({ register, control }) => {
  // const { register, control } = useForm({
  //   defaultValues: {
  //     materials: [{ material: '', quantity: '', unit: '' }],
  //   },
  // })
  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })

  return (
    <div className="container">
      <div className="flex">
        <h3>作り方</h3>
      </div>
      <div className="">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div key={field.id}>
            <h4>{index + 1}.</h4>
            <div>
              <input
                type="text"
                hidden
                value={index}
                {...register(`steps.${index}.order`)}
              />
              <input
                className="border"
                // type="quantity"
                type="file"
                placeholder="100"
                // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                {...register(`steps.${index}.image`)}
              />
            </div>
            <div>
              <textarea
                className="border mt-4"
                name=""
                id=""
                // type="step_text"
                cols="30"
                rows="10"
                placeholder="手順を入力"
                {...register(`steps.${index}.text`)}></textarea>
            </div>
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            <button
              className="border"
              type="button"
              onClick={() => remove(index)}>
              ✕
            </button>
          </div>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border block mx-auto px-2 rounded-full text-sm"
          type="button"
          onClick={() => append({ order: '', image: '', text: '' })}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default Steps
