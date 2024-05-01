'use client'
import { useFieldArray } from 'react-hook-form'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import Dropzone from 'react-dropzone'

const Reports = ({ register, setValue, control, errors, watcher }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'reports',
    control,
  })

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3 className="bold sm:text-2xl">レポート</h3>
      </div>
      <div>
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div key={field.id} className="my-4">
            <hr />
            <h4 className="sm:text-2xl">{index + 1}.</h4>
            <input
              type="text"
              value={index + 1}
              hidden
              {...register(`reports.${index}.order`)}
            />
            <div className="bg-orange w-full aspect-[4/3] max-w-md mx-auto">
              {watcher.reports[index].url ? (
                <div className="image-preview aspect-[4/3] max-w-md relative flex mx-auto">
                  <button
                    className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                    type="button"
                    onClick={() => {
                      // setReportsData(prevState => {
                      //   const newState = [...prevState]
                      //   newState[index] = ''
                      //   return newState
                      // })
                      setValue(`reports.${index}.file`, '')
                      setValue(`reports.${index}.url`, '')
                    }}>
                    ✕
                  </button>
                  {watcher.reports[index].url && (
                    <img
                      src={watcher.reports[index].url}
                      className="object-cover aspect-[4/3] max-w-md w-full h-full block"
                      alt="Uploaded Image"
                    />
                  )}
                </div>
              ) : (
                <Dropzone
                  className="w-full h-full"
                  onDrop={acceptedFiles => {
                    const file = acceptedFiles[0]
                    const createdUrl = URL.createObjectURL(file)
                    setValue(`reports.${index}.file`, file)
                    setValue(`reports.${index}.url`, createdUrl)
                  }}>
                  {({ getRootProps, getInputProps }) => (
                    <>
                      <div
                        {...getRootProps()}
                        className="w-full h-full flex justify-center items-center">
                        <IconContext.Provider
                          value={{ color: '#ccc', size: '80px' }}>
                          <PiCameraLight />
                        </IconContext.Provider>
                        <input type="text hidden" {...getInputProps()} />
                      </div>
                    </>
                  )}
                </Dropzone>
              )}
            </div>
            <div>
              <textarea
                className="border mt-4 w-full"
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="コメントを入力"
                {...register(`reports.${index}.text`)}
              />
              {errors.reports &&
                errors.reports[index] &&
                errors.reports[index].text && (
                  <div className="text-red-400">
                    {errors.reports[index].text.message}
                  </div>
                )}
            </div>
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            {index !== 0 && (
              <button
                className="border"
                type="button"
                onClick={() => {
                  remove(index)
                }}>
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button
          className="border bg-button border-button-color block mx-auto px-8 py-2 rounded-full text-sm"
          type="button"
          onClick={() => {
            let nextOrder = fields.length + 1
            return append({
              order: nextOrder,
              text: '',
              url: '',
              path: '',
              file: '',
            })
          }}>
          レポートを追加
        </button>
      </div>
    </div>
  )
}

export default Reports
