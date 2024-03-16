'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { createRef, useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import { useDropzone } from 'react-dropzone'
import Dropzone from 'react-dropzone'

const EditStep = ({
  register,
  control,
  setValue,
  stepsData,
  setStepsData,
  reset,
}) => {
  console.log(stepsData)

  const itemsRef = useRef(null)

  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })

  console.log(fields)

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
              <h4>{field.order}.</h4>
              <div className="bg-orange h-52 w-full mx-auto">
                {stepsData[field.order] && stepsData[field.order].image_url ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      // defaultValue={field.image}
                      onClick={e =>
                        // setStepImage(prevState => ({ ...prevState, [index]: '' }))
                        setStepsData(prevState => {
                          setValue(`steps.${index}.image`, '')
                          return {
                            ...prevState,
                            [field.order]: {
                              order: field.order,
                              image_url: '',
                              text: field.text,
                            },
                          }
                        })
                      }>
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
                      const file = acceptedFiles[0]
                      const createdUrl = URL.createObjectURL(file)
                      setValue(`steps.${index}`, {
                        order: field.order,
                        file,
                        image_url: createdUrl,
                        text: field.text,
                      })
                      setStepsData(prevState => ({
                        ...prevState,
                        [field.order]: {
                          order: field.order,
                          file,
                          image_url: createdUrl,
                          text: field.text,
                        },
                      }))
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
                  onClick={() => remove(index)}>
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
