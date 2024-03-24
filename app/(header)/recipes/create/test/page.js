'use client'

import { supabase } from '@/lib/utils/supabase/supabase'
import { v4 as uuidv4 } from 'uuid'

const page = () => {
  const onSubmit = e => {
    e.preventDefault()
    console.log(e)
    // if (file!!.type.match("image.*")) {
    // if (file.type.match('image.*')) {
    //   const fileExtension = file.name.split('.').pop()

    //   const { data, error } = supabase.storage
    //     .from('VegEvery-backet')
    //     .upload(`img/${uuidv4()}.${fileExtension}`, file)
    //   if (error) {
    //     alert('エラーが発生しました：' + error.message)
    //     return
    //   }
    // } else {
    //   alert('画像ファイル以外はアップロード出来ません。')
    // }
    // console.log(data)
  }
  return (
    <form className="mb-4 text-center" onSubmit={onSubmit}>
      <input
        className="relative mb-4 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
        type="file"
        id="formFile"
        accept="image/*"
        // onChange={() => {
        //   onSubmit()
        // }}
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:opacity-25">
        送信
      </button>
    </form>
  )
}

export default page
