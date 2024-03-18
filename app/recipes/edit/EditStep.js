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

  // useEffectフック内でhandleDrop関数を参照するよう修正
  useEffect(() => {
    console.log(fields)
    console.log(stepsData)
  }, [fields, stepsData])

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
                {stepsData[index] ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      onClick={e => {
                        setStepsData(prevState => {
                          console.log(index)
                          const newState = [...prevState]
                          newState.splice(index, 1)
                          console.log(newState)
                          return newState
                        })
                        setValue(`steps.${index}`, {
                          image: '',
                          image_path: '',
                          image_url: '',
                        })
                      }}>
                      ✕
                    </button>
                    {stepsData[index] && (
                      <img
                        src={stepsData[index]}
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
                      const file = acceptedFiles[0]
                      const createdUrl = URL.createObjectURL(file)
                      console.log(field)
                      console.log(field.text)
                      // setValue(`steps.${index}`, {
                      //   order: field.order,
                      //   file: file,
                      //   image_url: createdUrl,
                      //   text: field.text,
                      // })
                      console.log(
                        `setValue called for steps[${index}].image_url with value:`,
                        createdUrl,
                      )
                      setStepsData(prevState => {
                        console.log(prevState)
                        const newState = [...prevState]
                        console.log(newState)
                        newState[index] = createdUrl
                        console.log(newState)
                        console.log(newState === prevState)
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
                      const newData = []
                      for (let i = 0; i < fields.length; i++) {
                        if (i !== index) {
                          newData.push(prevState[i])
                        }
                        console.log(newData)
                      }
                      return newData
                    })

                    console.log(fields)
                    console.log(stepsData)

                    // for (let i = 0; i < fields.length; i++) {
                    //   if (i !== fields.length - 1) {
                    //     if (i >= index) {
                    //       console.log(`index.${index}`)
                    //       console.log(`steps.${i}`)
                    //       console.log(fields[i + 1])
                    //       setValue(`steps.${i}`, {
                    //         order: i + 1,
                    //         image_url: fields[i + 1].image_url,
                    //         text: fields[i + 1].text,
                    //       })
                    //       // setStepsData(prevState => {
                    //       //   return {

                    //       //   }
                    //       // })
                    //     }
                    //   }
                    // }
                    // fields.forEach((field, num) => {
                    //   if (num >= index) {
                    //     console.log(num)
                    //     console.log(index)
                    //     console.log(field)
                    //     // setValue(`steps.${num}.order`, num + 1)
                    //     setValue(`steps.${num}`, {
                    //       order: num + 1,
                    //       image_url: '',
                    //       text: '',
                    //     })
                    //     setStepsData(prevState => {
                    //       return {
                    //         ...prevState,
                    //         [num]: {
                    //           order: num + 1,
                    //           image_url:
                    //             typeof stepsData[num + 1].image_url !=
                    //             'undefined'
                    //               ? stepsData[num + 1].image_url
                    //               : '',
                    //           text:
                    //             typeof stepsData[num + 1].text != 'undefined'
                    //               ? stepsData[num + 1].text
                    //               : '',
                    //         },
                    //       }
                    //     })
                    //   }
                    // })
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
            setStepsData(prevState => {
              return [...prevState, '']
            })
            return append({ order: nextOrder, image_url: '', text: '' })
          }}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
