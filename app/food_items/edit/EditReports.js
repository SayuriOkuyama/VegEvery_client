'use client'
import { useFieldArray } from 'react-hook-form'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'
import Dropzone from 'react-dropzone'

const EditStep = ({
  register,
  control,
  setValue,
  reportsData,
  setReportsData,
  reset,
}) => {
  // console.log(stepsData)

  const { fields, append, remove } = useFieldArray({
    name: 'reports',
    control,
  })

  console.log(fields)

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>レポート</h3>
      </div>
      <div className="">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="my-4">
              <h4>{index + 1}.</h4>
              <input
                type="text"
                value={index + 1}
                hidden
                {...register(`reports.${index}.order`)}
              />
              <div className="bg-orange h-52 w-full mx-auto">
                {reportsData[field.order] &&
                reportsData[field.order].image_url ? (
                  <div className="image-preview relative flex h-52 mx-auto">
                    <button
                      className="absolute right-1 top-1 bg-white w-4 h-4 leading-none"
                      type="button"
                      onClick={e => {
                        setStepsData(prevState => {
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
                        setValue(`reports.${index}`, {
                          image: '',
                          image_path: '',
                          image_url: '',
                        })
                      }}>
                      ✕
                    </button>
                    {reportsData[field.order].image_url && (
                      <img
                        src={reportsData[field.order].image_url}
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
                      setValue(`reports.${index}`, {
                        order: field.order,
                        file,
                        image_url: createdUrl,
                        text: field.text,
                      })
                      setReportsData(prevState => ({
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
                  {...register(`reports.${index}.text`)}></textarea>
              </div>
              {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
              {index !== 0 && (
                <button
                  className="border"
                  type="button"
                  onClick={() => {
                    remove(index)
                    setReportsData(prevState => {
                      return {
                        ...prevState,
                        [field.order]: {
                          order: field.order,
                          image_url: '',
                          text: field.text,
                        },
                      }
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
          onClick={() => {
            let nextOrder = fields.length + 1
            return append({ order: nextOrder, image_url: '', text: '' })
          }}>
          レポートを追加
        </button>
      </div>
    </div>
  )
}

export default EditStep
