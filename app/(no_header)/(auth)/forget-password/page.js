'use client'

import { useState } from 'react'
import Logo from '@/components/ui/Logo'
import CheckSecretQuestion from '@/components/layouts/user/CheckSecretQuestion'
import SettingPassword from '@/components/layouts/user/SettingPassword'

const page = () => {
  const [page, setPage] = useState('checkSecretQuestion')
  const [user, setUser] = useState('')

  return (
    <>
      <div className="pt-8">
        <Logo size="100" />
      </div>
      <main className="mx-auto mt-8 pb-24">
        {page === 'checkSecretQuestion' && (
          <CheckSecretQuestion setPage={setPage} setUser={setUser} />
        )}
        {page === 'resetPassword' && (
          <SettingPassword user={user} type="forget" />
        )}
      </main>
    </>
  )
}

export default page
