'use client'

import Link from 'next/link'
import React from 'react'
import { PiBooksThin } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { PiUserRectangleThin } from 'react-icons/pi'
import { PiLockKeyLight } from 'react-icons/pi'
import { PiUserCircleMinusThin } from 'react-icons/pi'
import { PiNotebookLight } from 'react-icons/pi'
import { CiLogout } from 'react-icons/ci'
import { useAuth } from '@/hooks/auth'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
const page = () => {
  const { logout } = useAuth()

  const handleLogout = () => {}

  return (
    <>
      <main className="pb-24 container flex flex-col justify-around h-4/5">
        <div className="mt-8 flex justify-around">
          <div className="border border-button-color rounded-md w-36 h-40">
            <Link
              href={'/account/book-shelf'}
              className="h-40 flex flex-col justify-around pb-2">
              <p className="text-center pt-2 h-10">本棚一覧</p>
              <IconContext.Provider
                value={{ size: '95px', className: 'mx-auto h-30' }}>
                <PiBooksThin />
              </IconContext.Provider>
            </Link>
          </div>
          <div className="border border-button-color rounded-md w-36 h-40">
            <Link
              href={'/account/memo'}
              className="h-40 flex flex-col justify-around pb-2">
              <p className="text-center p-2">メモの作成</p>
              <IconContext.Provider
                value={{ size: '85px', className: 'mx-auto' }}>
                <PiNotebookLight />
              </IconContext.Provider>
            </Link>
          </div>
        </div>
        <div className="flex justify-around">
          <div className="border border-button-color rounded-md w-36 h-40">
            <Link
              href={'/account/profile'}
              className="h-40 flex flex-col justify-around pb-2">
              <p className="text-center p-2">アカウント情報</p>
              <IconContext.Provider
                value={{ size: '100px', className: 'mx-auto' }}>
                <PiUserRectangleThin />
              </IconContext.Provider>
            </Link>
          </div>
          <div className="border border-button-color rounded-md w-36 h-40">
            <Link
              href={'/account/password-change'}
              className="h-40 flex flex-col justify-around pb-2">
              <p className="text-center p-2">パスワード変更</p>
              <IconContext.Provider
                value={{
                  size: '80px',
                  className: 'mx-auto',
                }}>
                <PiLockKeyLight />
              </IconContext.Provider>
            </Link>
          </div>
        </div>

        <div className="flex justify-around">
          <Dialog>
            <DialogTrigger asChild>
              <div className="border border-button-color rounded-md w-36 h-40">
                <button
                  onClick={handleLogout}
                  className="h-40 w-36 flex flex-col justify-around pb-2">
                  <p className="text-center w-full p-2">ログアウト</p>
                  <IconContext.Provider
                    value={{
                      size: '85px',
                      className: 'mx-auto flex items-center',
                    }}>
                    <CiLogout />
                  </IconContext.Provider>
                </button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>本当にログアウトしますか？</DialogTitle>
              </DialogHeader>
              <DialogFooter>
                <Button
                  onClick={logout}
                  className="mx-auto bg-button border-button-color">
                  ログアウト
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="border border-button-color rounded-md w-36 h-40">
            <Link
              href={'/account/deletion'}
              className="h-40 flex flex-col justify-around pb-2">
              <p className="text-center p-2">アカウント削除</p>
              <IconContext.Provider
                value={{ size: '95px', className: 'mx-auto' }}>
                <PiUserCircleMinusThin />
              </IconContext.Provider>
            </Link>
          </div>
        </div>
        {/* <LogoutDialog /> */}
      </main>
    </>
  )
}

export default page
