'use client'
import Logo from '@/components/ui/Logo'
import Link from 'next/link'
// import { PiHouseLineLight } from 'react-icons/pi'
import { PiMapPinLineLight } from 'react-icons/pi'
import { PiCookingPotLight } from 'react-icons/pi'
import { CiApple } from 'react-icons/ci'
import { CiUser } from 'react-icons/ci'
import { TfiInfoAlt } from 'react-icons/tfi'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import Image from 'next/image'

const Footer = () => {
  return (
    <>
      <div className="container flex justify-between py-16 text-xl">
        <div className="h-full flex justify-center">
          <Logo size="80" />
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <ul className="space-y-4 flex flex-col justify-start">
            <li>
              <Link href={'/recipes'} className="w-fit h-fit">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10">
                    <PiCookingPotLight size="30" />
                  </div>
                  <div className="ml-2">Recipe</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/food_items'} className="w-fit h-fit">
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-10">
                    <CiApple size="30" />
                  </div>
                  <div className="ml-2">Items</div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={'/map'} className="w-fit h-fit">
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-10">
                    <PiMapPinLineLight size="30" />
                  </div>
                  <div className="ml-2">Map</div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/3 flex justify-center items-center">
          <ul className="space-y-4 flex flex-col justify-start">
            <li>
              {/* <Link href={'/recipes'} className="w-fit h-fit"> */}
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10">
                  <TfiInfoAlt size="26" />
                </div>
                <div className="ml-2">
                  News <small className="text-sm">(※準備中)</small>
                </div>
              </div>
              {/* </Link> */}
            </li>
            <li>
              <Link href={'/account'} className="w-fit h-fit">
                <div className="flex items-center justify-start">
                  <div className="flex items-center justify-center w-10">
                    <CiUser size="34" />
                  </div>
                  <div className="ml-2">Account</div>
                </div>
              </Link>
            </li>
            <li>
              {/* <Link href={'/map'} className="w-fit h-fit"> */}
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center w-10">
                  <IoIosHelpCircleOutline size="30" />
                </div>
                <div className="ml-2">
                  Help <small className="text-sm">(※準備中)</small>
                </div>
              </div>
              {/* </Link> */}
            </li>
          </ul>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="flex items-center">
            <a
              href="https://twitter.com/VegEvery_x"
              target="_blank"
              rel="noreferrer">
              <div className="flex items-center rounded-full bg-white p-4 border">
                <Image src="/x-logo-black.png" width={40} height={40} alt="X" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
