import { LiaSpinnerSolid } from 'react-icons/lia'

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex justify-center items-center space-x-1">
        <LiaSpinnerSolid className="animate-spin" />
        <p>Loading..</p>
      </div>
    </div>
  )
}

export default Loading
