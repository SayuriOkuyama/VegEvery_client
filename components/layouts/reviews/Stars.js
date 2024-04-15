import { useState } from 'react'
import { PiStarLight } from 'react-icons/pi'
import { PiStarFill } from 'react-icons/pi'

const Stars = ({ setValue }) => {
  const [num, setNum] = useState()

  const setStars = num => {
    setNum(num)
    setValue('stars', num)
  }

  return (
    <div className="flex space-x-2 justify-center text-orange-500 mb-2 text-2xl">
      <span onClick={() => setStars(1)}>
        {num >= 1 ? <PiStarFill /> : <PiStarLight />}
      </span>
      <span onClick={() => setStars(2)}>
        {num >= 2 ? <PiStarFill /> : <PiStarLight />}
      </span>
      <span onClick={() => setStars(3)}>
        {num >= 3 ? <PiStarFill /> : <PiStarLight />}
      </span>
      <span onClick={() => setStars(4)}>
        {num >= 4 ? <PiStarFill /> : <PiStarLight />}
      </span>
      <span onClick={() => setStars(5)}>
        {num === 5 ? <PiStarFill /> : <PiStarLight />}
      </span>
    </div>
  )
}

export default Stars
