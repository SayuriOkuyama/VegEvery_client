'use client'

import Link from 'next/link'
import styles from '@/components/layouts/Navigation/Navigation.module.css'
import { PiHouseLineLight } from 'react-icons/pi'
import { PiMapPinLineLight } from 'react-icons/pi'
import { PiCookingPotLight } from 'react-icons/pi'
import { CiApple } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [user, setUser] = useState()
  const pathname = usePathname()

  useEffect(() => {
    const getUser = async () => {
      axios.get('/sanctum/csrf-cookie')
      axios.get('/api/user').then(res => setUser(res.data))
    }
    getUser()
  }, [pathname])

  let accountPath
  if (user) {
    accountPath = '/account'
  } else {
    accountPath = '/login'
  }
  console.log(user)
  console.log(accountPath)

  return (
    <>
      <div
        className={`${styles.wrapper} ${styles.footer_nav} h-16 footer_nav flex pb-2`}>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiHouseLineLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center text-sm`}>Top</div>
          </div>
        </Link>
        <Link href={'/recipes'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiCookingPotLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center text-sm`}>Recipe</div>
          </div>
        </Link>
        <Link href={'/food_items'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <CiApple size="80%" />
            </div>
            <div className={`${styles.menu}  text-center text-sm`}>Items</div>
          </div>
        </Link>
        <Link href={'/map'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiMapPinLineLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center text-sm`}>Map</div>
          </div>
        </Link>
        <Link href={accountPath} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              {/* アカウント */}
              <CiUser size="80%" />
            </div>
            <div className={`${styles.menu} text-center text-sm`}>Account</div>
          </div>
        </Link>
      </div>
    </>
  )
}
