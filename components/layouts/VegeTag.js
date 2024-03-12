import { Avatar } from '@/components/ui/avatar'
import React from 'react'

const VegeTag = ({ vegeTags, size }) => {
  return (
    <div className="flex">
      {vegeTags &&
        vegeTags[0] &&
        (size === 'small' ? (
          <Avatar className="bg-color-v w-6 h-6 justify-center items-center text-sm">
            V
          </Avatar>
        ) : (
          <Avatar className="bg-color-v w-8 h-8 justify-center items-center text-sm mx-1">
            V
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[1] &&
        (size === 'small' ? (
          <Avatar className="bg-color-ori w-6 h-6 justify-center items-center text-sm">
            Ori
          </Avatar>
        ) : (
          <Avatar className="bg-color-v w-8 h-8 justify-center items-center text-sm mx-1">
            V
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[2] &&
        (size === 'small' ? (
          <Avatar className="bg-color-ovo w-6 h-6 justify-center items-center text-sm">
            Ovo
          </Avatar>
        ) : (
          <Avatar className="bg-color-ovo w-8 h-8 justify-center items-center text-sm mx-1">
            Ovo
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[3] &&
        (size === 'small' ? (
          <Avatar className="bg-color-psc w-6 h-6 justify-center items-center text-sm">
            Psc
          </Avatar>
        ) : (
          <Avatar className="bg-color-psc w-8 h-8 justify-center items-center text-sm mx-1">
            Psc
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[4] &&
        (size === 'small' ? (
          <Avatar className="bg-color-lct w-6 h-6 justify-center items-center text-sm">
            Lct
          </Avatar>
        ) : (
          <Avatar className="bg-color-lct w-8 h-8 justify-center items-center text-sm mx-1">
            Lct
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[5] &&
        (size === 'small' ? (
          <Avatar className="bg-color-pol w-6 h-6 justify-center items-center text-sm">
            Pol
          </Avatar>
        ) : (
          <Avatar className="bg-color-pol w-8 h-8 justify-center items-center text-sm mx-1">
            Pol
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[6] &&
        (size === 'small' ? (
          <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
            Flu
          </Avatar>
        ) : (
          <Avatar className="bg-color-flu w-8 h-8 justify-center items-center text-sm mx-1">
            Flu
          </Avatar>
        ))}
      {vegeTags &&
        vegeTags[7] &&
        (size === 'small' ? (
          <Avatar className="bg-color-flu w-6 h-6 justify-center items-center text-sm">
            Oth
          </Avatar>
        ) : (
          <Avatar className="bg-color-flu w-8 h-8 justify-center items-center text-sm mx-1">
            Oth
          </Avatar>
        ))}
    </div>
  )
}

export default VegeTag
