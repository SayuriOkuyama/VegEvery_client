'use client'

import { useFieldArray } from 'react-hook-form'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import Dropzone from 'react-dropzone'

const Reports = ({ register, control, reportImages, setReportImages }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'reports',
    control,
  })
  // console.log(fields)
  // console.log(reportImages)

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>レポート</h3>
      </div>
      <div className="">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div key={field.id} className="my-4">
            <hr />
            <h4>{index + 1}.</h4>
            <input
              type="text"
              value={index + 1}
              hidden
              {...register(`reports.${index}.order`)}
            />
            <div className="bg-orange h-52 w-full mx-auto">
              {reportImages[index] && reportImages[index].url ? (
                <div className="image-preview relative flex h-52 mx-auto">
                  <button
                    className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                    type="button"
                    onClick={() => {
                      setReportImages(prevState => {
                        const newState = [...prevState]
                        newState[index] = ''
                        return newState
                      })
                    }}>
                    ✕
                  </button>
                  {reportImages[index].url && (
                    <img
                      src={reportImages[index].url}
                      className="object-cover w-full h-full block"
                      alt="Uploaded Image"
                    />
                  )}
                </div>
              ) : (
                <Dropzone
                  className="h-52"
                  onDrop={acceptedFiles => {
                    const file = acceptedFiles[0]
                    const createdUrl = URL.createObjectURL(file)
                    setReportImages(prevState => {
                      const newState = [...prevState]
                      newState[index] = { url: createdUrl, file: file }
                      return newState
                    })
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
                cols="30"
                rows="10"
                placeholder="コメントを入力"
                defaultValue={field.text}
                {...register(`reports.${index}.text`)}
              />
            </div>
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            {index !== 0 && (
              <button
                className="border"
                type="button"
                onClick={() => {
                  remove(index)
                  setReportImages(prevState => {
                    const newData = []
                    for (let i = 0; i < fields.length; i++) {
                      if (i !== index) {
                        newData.push(prevState[i])
                      }
                    }
                    return newData
                  })
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
          className="border bg-button border-button-color block mx-auto px-2 rounded-full text-sm"
          type="button"
          onClick={() => append({ text: '' })}>
          レポートを追加
        </button>
      </div>
    </div>
  )
}

export default Reports
