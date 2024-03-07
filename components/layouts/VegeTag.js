import { Avatar } from '@/components/ui/avatar'
import React from 'react'

const VegeTag = ({ vegeTags }) => {
  return (
    <div className="flex">
      {vegeTags && vegeTags[0] && (
        <Avatar className="bg-color-v w-6 h-6 justify-center items-center text-sm">
          V
        </Avatar>
      )}
      {vegeTags && vegeTags[1] === 1 && (
        <Avatar className="bg-color-ori w-6 h-6 justify-center items-center text-sm">
          Ori
        </Avatar>
      )}
      {vegeTags && vegeTags[2] === 1 && (
        <Avatar className="bg-color-ovo w-6 h-6 justify-center items-center text-sm">
          Ovo
        </Avatar>
      )}
      {vegeTags && vegeTags[3] === 1 && (
        <Avatar className="bg-color-psc w-6 h-6 justify-center items-center text-sm">
          Psc
        </Avatar>
      )}
      {vegeTags && vegeTags[4] === 1 && (
        <Avatar className="bg-color-lct w-6 h-6 justify-center items-center text-sm">
          Lct
        </Avatar>
      )}
      {vegeTags && vegeTags[5] === 1 && (
        <Avatar className="bg-color-pol w-6 h-6 justify-center items-center text-sm">
          Pol
        </Avatar>
      )}
      {vegeTags && vegeTags[6] === 1 && (
        <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
          Flu
        </Avatar>
      )}
      {vegeTags && vegeTags[7] === 1 && (
        <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
          Oth
        </Avatar>
      )}
    </div>
  )
}

export default VegeTag
