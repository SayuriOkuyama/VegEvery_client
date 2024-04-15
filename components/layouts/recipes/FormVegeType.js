'use client'

import { Avatar } from '@/components/ui/avatar'

const EditFormVegeTypes = ({ register, type, index }) => {
  return (
    <div>
      {type === 'menu' ? (
        <h3 className="text-start">対応のベジタリアンを選択</h3>
      ) : (
        <h3 className="text-center">対応のベジタリアンを選択</h3>
      )}
      <div className="text-center space-x-1 flex justify-center">
        <label htmlFor={type === 'menu' ? `vegan_${index}` : 'vegan'}>
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              type="checkbox"
              id={type === 'menu' ? `vegan_${index}` : 'vegan'}
              hidden
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.vegan`
                  : `vege_type.vegan`,
                { valueAsBoolean: true }, // 追加
              )}
            />
            V
          </Avatar>
        </label>

        <label htmlFor={type === 'menu' ? `Oriental_${index}` : 'Oriental'}>
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              type="checkbox"
              id={type === 'menu' ? `Oriental_${index}` : 'Oriental'}
              hidden
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.oriental_vegetarian`
                  : `vege_type.oriental_vegetarian`,
              )}
            />
            Ori
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Ovo_${index}` : 'Ovo'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Ovo_${index}` : 'Ovo'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.ovo_vegetarian`
                  : `vege_type.ovo_vegetarian`,
              )}
            />
            Ovo
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Psc_${index}` : 'Psc'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Psc_${index}` : 'Psc'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.pescatarian`
                  : `vege_type.pescatarian`,
              )}
            />
            Psc
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Lct_${index}` : 'Lct'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Lct_${index}` : 'Lct'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.lacto_vegetarian`
                  : `vege_type.lacto_vegetarian`,
              )}
            />
            Lct
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Pol_${index}` : 'Pol'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Pol_${index}` : 'Pol'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.pollo_vegetarian`
                  : `vege_type.pollo_vegetarian`,
              )}
            />
            Pol
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Flu_${index}` : 'Flu'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Flu_${index}` : 'Flu'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.fruitarian`
                  : `vege_type.fruitarian`,
              )}
            />
            Flu
          </Avatar>
        </label>

        <label
          htmlFor={type === 'menu' ? `Oth_${index}` : 'Oth'}
          className="checked:bg-orange">
          <Avatar className="bg-white border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id={type === 'menu' ? `Oth_${index}` : 'Oth'}
              {...register(
                type === 'menu'
                  ? `menus.${index}.vege_type.other_vegetarian`
                  : `vege_type.other_vegetarian`,
              )}
            />
            Oth
          </Avatar>
        </label>
      </div>
    </div>
  )
}

export default EditFormVegeTypes
