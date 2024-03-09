'use client'
const FormVegeType = ({ register }) => {
  return (
    <div>
      <h3 className="text-center">対応のベジタリアンを選択</h3>
      <div className="text-center space-x-2 flex justify-center">
        <div className="has-[:checked]:bg-blue-200">
          <label htmlFor="vegan">
            <input
              type="checkbox"
              id="vegan"
              hidden
              {...register(`vege_type.vegan`, { name: 'vege_type' })}
            />
            Vegan
          </label>
        </div>

        <div className="has-[:checked]:bg-blue-200">
          <label htmlFor="Oriental">
            <input
              type="checkbox"
              id="Oriental"
              hidden
              {...register(`vege_type.ori`, { name: 'vege_type' })}
            />
            Oriental
          </label>
        </div>

        <div className="has-[:checked]:bg-blue-200">
          <label htmlFor="Ovo" className="checked:bg-orange">
            <input
              hidden
              type="checkbox"
              id="Ovo"
              {...register(`vege_type.ovo`, { name: 'vege_type' })}
            />
            Ovo
          </label>
        </div>
      </div>
    </div>
  )
}

export default FormVegeType
