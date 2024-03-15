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

  // useEffect(() => {
  //   console.log('エフェクト')

  //   if (fields.length === 0) {
  //     Object.keys(stepsData).map(key => {
  //       console.log({
  //         order: key,
  //         Image: stepsData[key].image,
  //         text: stepsData[key].text,
  //       })
  //       append({
  //         order: key,
  //         image: stepsData[key].image,
  //         text: stepsData[key].text,
  //       })
  //     })
  //   }
  // }, [stepsData, append])

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>作り方</h3>
      </div>
      <div className="">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => {
          console.log(field)
          return (
            <div key={field.id} className="my-4">
              <h4>{field.order}.</h4>
              <div className="bg-orange h-52 w-full mx-auto">
                {field.image ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      // defaultValue={field.image}
                      onClick={() =>
                        setStepsData(prevState => {
                          console.log({
                            ...prevState,
                            [field.order]: {
                              order: field.order,
                              image: '',
                              text: field.text,
                            },
                          })
                          return {
                            ...prevState,
                            [field.order]: {
                              order: field.order,
                              image: '',
                              text: field.text,
                            },
                          }
                        })
                      }>
                      ✕
                    </button>
                    {field.image && (
                      <img
                        src={field.image}
                        name={field.image}
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
                      setValue(`steps.${stepsData.order}`, {
                        order: field.order,
                        file,
                        image: createdUrl,
                        text: field.text,
                      })
                      setStepsData(prevState => ({
                        ...prevState,
                        [key]: {
                          order: field.order,
                          file,
                          image: createdUrl,
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
              <div>{field.order}</div>
              <div>{field.image}</div>
              <div>{field.text}</div>
              <div>
                <textarea
                  className="border mt-4 w-full"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="手順を入力"
                  // defaultValue={field.text}
                  // defaultValue={'a'}
                  value={field.text}
                  // onChange={e => textHandler(e)}
                  // defaultValue={''}
                  {...register(`steps.${stepsData.order}.text`)}></textarea>
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
          onClick={() => append({ order: '', image: '', text: '' })}>
          手順を追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
