'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.error('in recipes/error.js')
  }, [error])

  return (
    <div className="sm:min-h-[60svh] max-w-2xl mx-auto flex justify-center flex-col">
      <h2 className="text-center">エラーが発生しました。</h2>
      <h2 className="text-center">{error.message}</h2>
      <Button
        className="mx-auto bg-button block py-1 mt-16 border-button-color"
        onClick={() => reset()}>
        もう一度読み込む
      </Button>
    </div>
  )
}

export default Error
