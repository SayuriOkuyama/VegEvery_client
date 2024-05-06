'use client'

import { useAuth } from '@/hooks/auth'
import SettingPassword from '@/components/layouts/user/SettingPassword'
import Loading from '@/components/layouts/Loading'

const page = () => {
  const { user } = useAuth()

  if (!user) return <Loading />
  return <SettingPassword user={user} type="setting" />
}

export default page
