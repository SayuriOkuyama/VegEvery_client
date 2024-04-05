'use client'
import { createContext } from 'react'
import { useForm } from 'react-hook-form'

export const FormContext = createContext()

export const RegisterProvider = ({ children }) => {
  const { register, setValue, handleSubmit, watch } = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      password: '',
      reenteredPassword: '',
      iconFile: null,
      iconUrl: null,
      vegeType: 'none',
      secretQuestion: '',
      secretAnswer: '',
      provider: '',
      providerId: '',
    },
    mode: 'onChange', // リアルタイムで入力値を取得する
  })

  return (
    <FormContext.Provider value={[register, setValue, handleSubmit, watch]}>
      {children}
    </FormContext.Provider>
  )
}
