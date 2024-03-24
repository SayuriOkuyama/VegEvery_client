'use client'
import { useForm, useFieldArray } from 'react-hook-form'

const page = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      emails: [{ email: '' }],
    },
  })
  const { fields, append, remove, replace } = useFieldArray({
    name: 'emails',
    control,
  })

  const onSubmit = data => {
    // const { emails } = data
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {/* 一位に特定するために map する際に index を付与する */}
        {fields.map((field, index) => (
          <>
            <input
              key={field.id}
              type="email"
              // これを入れないと、remove を押した時にそれ以降の要素の入力値がクリアされる
              {...register(`emails.${index}.email`)}
            />
            {/* 何番目の要素を削除するか、index で指定する（指定しないと全部消える） */}
            <button key={field.id} type="button" onClick={() => remove(index)}>
              remove
            </button>
          </>
        ))}
      </div>
      <div>
        {/* 要素を追加する */}
        <button type="button" onClick={() => append({ email: '' })}>
          add
        </button>
      </div>

      {/* <button
        type="button"
        onClick={() => {
          replace([{ email: 'new email' }])
        }}>
        replace
      </button> */}
      <button type="submit">submit</button>
    </form>
  )
}
export default page
