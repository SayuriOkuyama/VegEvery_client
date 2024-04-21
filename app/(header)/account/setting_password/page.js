'use client'

import { useAuth } from '@/hooks/auth'
import SettingPassword from '@/components/layouts/user/SettingPassword'

const page = () => {
  const { user } = useAuth()

  if (!user) return <p>Loading...</p>
  return <SettingPassword user={user} type="setting" />
}

export default page
