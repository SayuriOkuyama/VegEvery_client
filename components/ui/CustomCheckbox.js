import { useEffect } from 'react'
import { GrCheckbox } from 'react-icons/gr'
import { GrCheckboxSelected } from 'react-icons/gr'

const CustomCheckbox = ({ register, id, watcher }) => {
  return (
    <label className="bg-white absolute top-1 right-1">
      {watcher.checkboxes[id] && watcher.checkboxes[id].delete ? (
        <GrCheckboxSelected size={24} />
      ) : (
        <GrCheckbox size={24} />
      )}
      <input type="checkbox" {...register(`checkboxes.${id}.delete`)} hidden />
    </label>
  )
}

export default CustomCheckbox
