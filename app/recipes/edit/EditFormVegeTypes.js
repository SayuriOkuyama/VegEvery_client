'use client'

import { Avatar } from '@/components/ui/avatar'

const FormVegeType = ({ register }) => {
  return (
    <div>
      <h3 className="text-center">対応のベジタリアンを選択</h3>
      <div className="text-center space-x-1 flex justify-center">
        <label htmlFor="vegan">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              type="checkbox"
              id="vegan"
              hidden
              {...register(`vege_type.vegan`)}
            />
            V
          </Avatar>
        </label>

        <label htmlFor="Oriental">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              type="checkbox"
              id="Oriental"
              hidden
              {...register(`vege_type.oriental_vegetarian`)}
            />
            Ori
          </Avatar>
        </label>

        <label htmlFor="Ovo" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Ovo"
              {...register(`vege_type.ovo_vegetarian`)}
            />
            Ovo
          </Avatar>
        </label>

        <label htmlFor="Psc" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Psc"
              {...register(`vege_type.pescatarian`)}
            />
            Psc
          </Avatar>
        </label>

        <label htmlFor="Lct" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Lct"
              {...register(`vege_type.lacto_vegetarian`)}
            />
            Lct
          </Avatar>
        </label>

        <label htmlFor="Pol" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Pol"
              {...register(`vege_type.pollo_vegetarian`)}
            />
            Pol
          </Avatar>
        </label>

        <label htmlFor="Flu" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Flu"
              {...register(`vege_type.fruitarian`)}
            />
            Flu
          </Avatar>
        </label>

        <label htmlFor="Oth" className="checked:bg-orange">
          <Avatar className="border w-8 h-8 justify-center items-center text-sm has-[:checked]:border-lime-600 has-[:checked]:border">
            <input
              hidden
              type="checkbox"
              id="Oth"
              {...register(`vege_type.other_vegetarian`)}
            />
            Oth
          </Avatar>
        </label>
      </div>
    </div>
  )
}

export default FormVegeType
