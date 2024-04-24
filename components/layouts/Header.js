import Logo from '@/components/ui/Logo'
import Link from 'next/link'
import { PiHouseLineLight } from 'react-icons/pi'
import { PiMapPinLineLight } from 'react-icons/pi'
import { PiCookingPotLight } from 'react-icons/pi'
import { CiApple } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'
import styles from '@/components/layouts/Navigation/Navigation.module.css'

export default function Header() {
  return (
    <>
      <div className="pt-4 mx-auto sm:hidden">
        <Logo size="50" />
      </div>
      <div className="hidden bg-green h-20 w-screen sm:flex top-0 left-0 justify-between items-center px-8">
        <div className="w-50">
          <Logo size="50" />
        </div>
        <nav className="w-4/5 h-full flex justify-end">
          <ul className="flex h-full space-x-2">
            <li>
              <Link href={'/'} className={styles.link}>
                <div className={`${styles.menu_wrapper} sm:flex items-center`}>
                  <div
                    className={`${styles.icon_wrapper} flex justify-center items-center h-16`}>
                    <PiHouseLineLight size="80%" />
                  </div>
                  <div className={`${styles.menu}  text-center text-sm`}>
                    Top
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/recipes'} className={styles.link}>
                <div className={`${styles.menu_wrapper} sm:flex items-center`}>
                  <div
                    className={`${styles.icon_wrapper} flex justify-center items-center h-16`}>
                    <PiCookingPotLight size="75%" />
                  </div>
                  <div className={`${styles.menu}  text-center text-sm`}>
                    Recipe
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/food_items'} className={styles.link}>
                <div className={`${styles.menu_wrapper} sm:flex items-center`}>
                  <div
                    className={`${styles.icon_wrapper} flex justify-center items-center h-16`}>
                    <CiApple size="80%" />
                  </div>
                  <div className={`${styles.menu}  text-center text-sm`}>
                    Items
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/map'} className={styles.link}>
                <div className={`${styles.menu_wrapper} sm:flex items-center`}>
                  <div
                    className={`${styles.icon_wrapper} flex justify-center items-center h-16`}>
                    <PiMapPinLineLight size="80%" />
                  </div>
                  <div className={`${styles.menu}  text-center text-sm`}>
                    Map
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/account" className={styles.link}>
                <div className={`${styles.menu_wrapper} sm:flex items-center`}>
                  <div
                    className={`${styles.icon_wrapper} flex justify-center items-center h-16`}>
                    <CiUser size="70%" />
                  </div>
                  <div className={`${styles.menu} text-center text-sm`}>
                    Account
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
