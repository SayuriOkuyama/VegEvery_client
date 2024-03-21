'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import Dropzone from 'react-dropzone'

const EditStep = ({ register, control, stepImages, setStepImages }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })

  console.log(fields)
  console.log(stepImages)

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>作り方</h3>
      </div>
      <div>
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="my-4">
              <h4>{index + 1}.</h4>
              <input
                type="text"
                value={index + 1}
                hidden
                {...register(`steps.${index}.order`)}
              />
              <div className="bg-orange h-52 w-full mx-auto">
                {stepImages[index].url ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      onClick={() => {
                        setStepImages(prevState => {
                          const newState = [...prevState]
                          newState[index] = ''
                          return newState
                        })
                      }}>
                      ✕
                    </button>
                    {stepImages[index].url && (
                      <img
                        src={stepImages[index].url}
                        className="object-cover w-full h-full block"
                        alt="Uploaded Image"
                      />
                    )}
                  </div>
                ) : (
                  <Dropzone
                    className="h-52"
                    onDrop={acceptedFiles => {
                      console.log('drop')
                      const file = acceptedFiles[0]
                      const createdUrl = URL.createObjectURL(file)
                      setStepImages(prevState => {
                        const newState = [...prevState]
                        newState[index] = { url: createdUrl, file: file }
                        return newState
                      })
                      // ↓これ入れたらテキスト消える
                      // setValue(`steps.${index}`, {
                      //   order: field.order,
                      //   file,
                      //   image_url: createdUrl,
                      //   text: field.text,
                      // })
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
                  placeholder="手順を入力"
                  defaultValue={field.text}
                  {...register(`steps.${index}.text`)}></textarea>
              </div>
              {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
              {index !== 0 && (
                <button
                  className="border"
                  type="button"
                  onClick={() => {
                    remove(index)

                    setStepImages(prevState => {
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
          )
        })}
        {/* 要素を追加する */}
        <button
          className="border bg-button border-button-color block mx-auto px-2 rounded-full text-sm"
          type="button"
          onClick={() => append({ text: '' })}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
