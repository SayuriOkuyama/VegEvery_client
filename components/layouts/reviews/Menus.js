'use client'
import { useFieldArray } from 'react-hook-form'
import FormVegeType from '@/components/layouts/recipes/FormVegeType.js'

const Menus = ({ register, control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'menus',
    control,
  })
  return (
    <div className="bg-green py-4 container">
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <hr className="" />
            <div className="space-y-4 py-2" key={field.id}>
              <label className="block">
                注文したメニュー
                <input
                  className="border block w-full mt-1"
                  type="text"
                  placeholder="ヴィーガンランチプレート"
                  {...register(`menus.${index}.name`)}
                />
              </label>
              <label className="py-1 block">
                価格
                <div className="flex items-center gap-1">
                  <input
                    className="border block w-1/2 mt-1 px-1"
                    type="text"
                    placeholder="1,500"
                    {...register(`menus.${index}.price`)}
                  />
                  円
                </div>
              </label>

              <FormVegeType register={register} type="menu" index={index} />

              {index !== 0 && (
                <button
                  className="border block ml-auto mr-0 bg-white w-4 h-4 text-center leading-none text-sm"
                  type="button"
                  onClick={() => remove(index)}>
                  ✕
                </button>
              )}
            </div>
            {errors.menus &&
              errors.menus[index] &&
              errors.menus[index].name && (
                <div className="text-red-400">
                  {errors.menus[index].name.message}
                </div>
              )}
            {errors.menus &&
              errors.menus[index] &&
              errors.menus[index].price && (
                <div className="text-red-400">
                  {errors.menus[index].price.message}
                </div>
              )}
          </div>
        ))}
        <hr className="" />
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border mt-4 block mx-auto px-2 rounded-full bg-button border-button-color text-sm"
          type="button"
          onClick={() =>
            append({
              name: '',
              price: '',
              vege_type: {
                vegan: false,
                oriental_vegetarian: false,
                ovo_vegetarian: false,
                pescatarian: false,
                lacto_vegetarian: false,
                pollo_vegetarian: false,
                fruitarian: false,
                other_vegetarian: false,
              },
            })
          }>
          アイテムを追加
        </button>
      </div>
    </div>
  )
}

export default Menus
