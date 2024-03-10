'use client'
import { useForm, useFieldArray } from 'react-hook-form'
import { createRef, useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { IconContext } from 'react-icons'

const Steps = ({ register, control }) => {
  const [image, setImage] = useState([])
  const refs = useRef([])
  const itemsRef = useRef(null)

  // const { register, control } = useForm({
  //   defaultValues: {
  //     materials: [{ material: '', quantity: '', unit: '' }],
  //   },
  // })
  const { fields, append, remove } = useFieldArray({
    name: 'steps',
    control,
  })
  const { ref } = register
  const showFolder = index => {
    const map = getMap()
    const thisStepMap = map.get(index)
    const node = thisStepMap.node
    console.log(node)

    if (node) {
      console.log('代わりにクリック')
      node.click()
    }
  }

  // state に画像をセットする
  const setFile = (e, index) => {
    console.log('セットする')
    const files = e.target.files
    // console.log(image)
    const map = getMap()
    map.set(index, { image: files[0] })
    const thisStepMap = map.get(index)
    const image = thisStepMap.image
    console.log(image)
    if (files) {
      console.log(files[0])
      // const formData = new FormData()
      // formData.append('images[]', files[0])
      setImage(prev => {
        return {
          ...prev,
          [index]: files[0],
        }
      })
      console.log(image)
    }
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map()
    }
    return itemsRef.current
  }

  return (
    <div className="container pb-8">
      <div className="flex">
        <h3>作り方</h3>
      </div>
      <div className="">
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <div key={field.id} className="my-4">
            <h4>{index + 1}.</h4>
            <div>
              <input
                type="text"
                hidden
                value={index + 1}
                {...register(`steps.${index}.order`)}
              />
              <div className="bg-orange">
                <button
                  type="button"
                  className="block mx-auto h-52"
                  onClick={() => showFolder(index)}>
                  <div className="w-full h-full flex justify-center items-center">
                    <IconContext.Provider
                      value={{ color: '#ccc', size: '80px' }}>
                      <PiCameraLight />
                    </IconContext.Provider>
                  </div>
                </button>
                <input
                  // ここで ref を指定
                  // ref={refs.current[index]}
                  ref={node => {
                    const map = getMap()
                    if (node) {
                      map.set(index, { node: node })
                    } else {
                      map.delete(index)
                    }
                  }}
                  className="border mx-auto"
                  type="file"
                  name="test"
                  accept=".png, .jpeg, .jpg "
                  // onClick={e => selectFile(e)}
                  onChange={e => setFile(e, index)}
                  hidden
                  // ここでは register に引数（ref）を渡さない！
                  // {...register(`steps.${index}.image`)}
                />
              </div>
              <img src={image[index]?.name} />
              {/*
              <input
                className="border"
                // type="quantity"
                type="file"
                placeholder="100"
                // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
                {...register(`steps.${index}.image`)}
              /> */}
            </div>
            <div>
              <textarea
                className="border mt-4"
                name=""
                id=""
                // type="step_text"
                cols="30"
                rows="10"
                placeholder="手順を入力"
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
        ))}
      </div>
      <div>
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

export default Steps
