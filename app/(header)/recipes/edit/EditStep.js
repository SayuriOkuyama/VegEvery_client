'use client'

import { useFieldArray } from 'react-hook-form'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import Dropzone from 'react-dropzone'

const EditStep = ({ register, control, stepImages, setStepImages, errors }) => {
  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })

  // console.log(fields)
  // console.log(stepImages)

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
              <div className="bg-orange w-full aspect-[4/3] max-w-md mx-auto">
                {stepImages[index] && stepImages[index].url ? (
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
                    {stepImages[index] && stepImages[index].url && (
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
                      // console.log('drop')
                      const file = acceptedFiles[0]
                      const createdUrl = URL.createObjectURL(file)
                      setStepImages(prevState => {
                        const newState = [...prevState]
                        newState[index] = {
                          url: createdUrl,
                          path: '',
                          file: file,
                        }
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
                  className="border mt-4 w-full p-2 sm:p-4"
                  cols="30"
                  rows="10"
                  placeholder="手順を入力"
                  defaultValue={field.text}
                  {...register(`steps.${index}.text`)}
                />
                {errors.steps &&
                  errors.steps[index] &&
                  errors.steps[index].text && (
                    <div className="text-red-400">
                      {errors.steps[index].text.message}
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
          className="border bg-button border-button-color block mx-auto px-8 py-2 rounded-full text-sm"
          type="button"
          onClick={() => append({ text: '' })}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
