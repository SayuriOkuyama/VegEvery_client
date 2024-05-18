'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

export default function GlobalError({ error }) {
  useEffect(() => {
    // エラーが発生したときに、引数のエラーを Sentry に送信する
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        {/* Next.js のデフォルトエラーコンポーネントで、エラーページを表示 */}
        <Error statusCode={error.statusCode} title={error.message} />
      </body>
    </html>
  )
}
