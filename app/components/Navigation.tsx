import Link from 'next/link'
import styles from '@/app/components/Navigation.module.css'
import { PiHouseLineLight } from 'react-icons/pi'
import { PiMapPinLineLight } from 'react-icons/pi'
import { PiCookingPotLight } from 'react-icons/pi'
import { CiApple } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'

export default function Navigation() {
  return (
    <>
      <div
        className={`${styles.wrapper} ${styles.footer_nav} h-16 footer_nav flex`}>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiHouseLineLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center`}>Top</div>
          </div>
        </Link>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiMapPinLineLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center`}>Map</div>
          </div>
        </Link>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <PiCookingPotLight size="80%" />
            </div>
            <div className={`${styles.menu}  text-center`}>Recipe</div>
          </div>
        </Link>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <CiApple size="80%" />
            </div>
            <div className={`${styles.menu}  text-center `}>Items</div>
          </div>
        </Link>
        <Link href={'/'} className={styles.link}>
          <div className={`${styles.menu_wrapper}`}>
            <div
              className={`${styles.icon_wrapper} flex justify-center items-center`}>
              <CiUser size="80%" />
            </div>
            <div className={`${styles.menu} text-center`}>Account</div>
          </div>
        </Link>
      </div>
    </>
  )
}
