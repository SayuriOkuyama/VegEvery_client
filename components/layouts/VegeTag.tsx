import { Avatar } from '@/components/ui/avatar'
import React from 'react'

const VegeTag = () => {
  return (
    <div className="flex">
      <Avatar className="bg-color-v w-6 h-6 justify-center items-center text-sm">
        V
      </Avatar>
      <Avatar className="bg-color-ori w-6 h-6 justify-center items-center text-sm">
        Ori
      </Avatar>
      <Avatar className="bg-color-ovo w-6 h-6 justify-center items-center text-sm">
        Ovo
      </Avatar>
      <Avatar className="bg-color-psc w-6 h-6 justify-center items-center text-sm">
        Psc
      </Avatar>
      <Avatar className="bg-color-lct w-6 h-6 justify-center items-center text-sm">
        Lct
      </Avatar>
      <Avatar className="bg-color-pol w-6 h-6 justify-center items-center text-sm">
        Pol
      </Avatar>
      <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
        Flu
      </Avatar>
    </div>
  )
}

export default VegeTag
