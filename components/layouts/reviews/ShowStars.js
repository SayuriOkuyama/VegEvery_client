import { PiStarLight } from 'react-icons/pi'
import { PiStarFill } from 'react-icons/pi'

const ShowStars = ({ num, size }) => {
  return (
    <div
      className={`${size === 'large' ? 'text-2xl' : 'text-xl'}
          flex space-x-1 justify-center text-orange-500 leading-none items-center`}>
      <span>{num >= 1 ? <PiStarFill /> : <PiStarLight />}</span>
      <span>{num >= 2 ? <PiStarFill /> : <PiStarLight />}</span>
      <span>{num >= 3 ? <PiStarFill /> : <PiStarLight />}</span>
      <span>{num >= 4 ? <PiStarFill /> : <PiStarLight />}</span>
      <span>{num === 5 ? <PiStarFill /> : <PiStarLight />}</span>
    </div>
  )
}

export default ShowStars
