'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('in recipes/error.js')
  }, [error])

  return (
    <div>
      <h2>{error.message}</h2>
      <Button
        className="mx-auto bg-button block py-1 mt-16 border-button-color"
        onClick={() => reset()}>
        もう一度読み込む
      </Button>
    </div>
  )
}

export default Error
