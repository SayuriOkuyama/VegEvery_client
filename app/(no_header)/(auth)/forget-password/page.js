'use client'

import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import CheckSecretQuestion from '@/components/layouts/user/CheckSecretQuestion'
import CheckSecretAnswer from '@/components/layouts/user/CheckSecretAnswer'
import SettingPassword from '@/components/layouts/user/SettingPassword'

const page = () => {
  const [page, setPage] = useState('checkSecretQuestion')
  const [user, setUser] = useState('')

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="mx-auto mt-8 pb-24 max-w-md">
        {page === 'checkSecretQuestion' && (
          <CheckSecretQuestion setPage={setPage} setUser={setUser} />
        )}
        {page === 'checkSecretAnswer' && (
          <CheckSecretAnswer setPage={setPage} user={user} />
        )}
        {page === 'resetPassword' && (
          <SettingPassword user={user} type="forget" setPage={setPage} />
        )}
      </main>
    </>
  )
}

export default page
