'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { createRef, useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'

const EditStep = ({ register, control, setValue, stepsData, setStepsData }) => {
  // console.log(stepsData)

  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })
  // フィールドを削除する関数
  const handleRemoveField = indexToRemove => {
    console.log(indexToRemove)
    // フィールドを削除
    remove(indexToRemove)

    // 削除されたフィールドより大きなインデックスを持つフィールドの order 値を更新
    fields.forEach((field, index) => {
      if (index >= indexToRemove) {
        setValue(`steps.${index}.order`, index + 1)
      }
    })
  }

  console.log(fields)
  console.log(stepsData)

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>作り方</h3>
      </div>
      <div className="">
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
                {stepsData[field.order] && stepsData[field.order].image_url ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      onClick={e => {
                        setStepsData(prevState => {
                          console.log(index)
                          console.log({
                            order: field.order,
                            image_url: '',
                            text: field.text,
                          })
                          return {
                            ...prevState,
                            [field.order]: {
                              ...prevState[field.order],
                              order: field.order,
                              image_url: '',
                              text: field.text,
                            },
                          }
                        })
                        setValue(`steps.${index}`, {
                          image: '',
                          image_path: '',
                          image_url: '',
                        })
                      }}>
                      ✕
                    </button>
                    {stepsData[field.order].image_url && (
                      <img
                        src={stepsData[field.order].image_url}
                        name={field.image_url}
                        className="object-cover w-full h-full block"
                        alt="Uploaded Image"
                      />
                    )}
                  </div>
                ) : (
                  <Dropzone
                    className="h-52"
                    onDrop={acceptedFiles => {
                      console.log('ドロップゾーン')
                      const file = acceptedFiles[0]
                      const createdUrl = URL.createObjectURL(file)
                      setValue(
                        `steps.${index}`,
                        {
                          order: field.order,
                          file,
                          image_url: createdUrl,
                          text: field.text,
                        },
                        // { shouldDirty: true },
                      )
                      console.log(
                        `setValue called for steps[${index}].image_url with value:`,
                        createdUrl,
                      )
                      setStepsData(prevState => {
                        console.log(index)
                        console.log({
                          order: field.order,
                          file,
                          image_url: createdUrl,
                          text: field.text,
                        })
                        return {
                          ...prevState,
                          [field.order]: {
                            // ...prevState[field.order],
                            order: field.order,
                            file,
                            image_url: createdUrl,
                            text: field.text,
                          },
                        }
                      })
                      console.log(
                        `setStepsData called for steps[${index}].image_url with value:`,
                        createdUrl,
                      )
                      console.log(index)
                      console.log({
                        order: field.order,
                        file,
                        image_url: createdUrl,
                        text: field.text,
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
                    setStepsData(prevState => {
                      return {
                        ...prevState,
                        [index]: {
                          order: '',
                          image_url: '',
                          text: '',
                        },
                      }
                    })
                    console.log(fields)
                    console.log(stepsData)

                    fields.forEach((field, num) => {
                      if (num >= index) {
                        console.log(num)
                        console.log(index)
                        console.log(field)
                        setValue(`steps.${num}.order`, num + 1)
                      }
                    })
                    // 削除されたフィールドより大きなインデックスを持つフィールドの order 値を更新
                    // fields.forEach((field, fieldIndex) => {
                    //   console.log(field)
                    //   console.log(fieldIndex > index)
                    //   if (fieldIndex >= index) {
                    //     // setValue(`steps.${index}.order`, index + 1)
                    //     setValue(`steps.${index}`, {
                    //       order: field.order + 1,
                    //       image_url:
                    //         typeof stepsData[field.order + 1] != 'undefined'
                    //           ? stepsData[field.order + 1].image_url
                    //           : '',
                    //       text:
                    //         typeof stepsData[index + 1] != 'undefined'
                    //           ? stepsData[index + 1].text
                    //           : '',
                    //     })
                    //     setStepsData(prevState => {
                    //       return {
                    //         ...prevState,
                    //         [index]: {
                    //           order: field.order + 1,
                    //           image_url:
                    //             typeof stepsData[index + 1] != 'undefined'
                    //               ? stepsData[index + 1].image_url
                    //               : '',
                    //           text:
                    //             typeof stepsData[index + 1] != 'undefined'
                    //               ? stepsData[index + 1].text
                    //               : '',
                    //         },
                    //       }
                    //     })
                    //   }
                    // })
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
          onClick={() => {
            let nextOrder = fields.length + 1
            return append({ order: nextOrder, image_url: '', text: '' })
          }}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
