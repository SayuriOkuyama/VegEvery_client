'use client'
import { createContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '@/lib/zod/registerFormSchema'

export const FormContext = createContext()

export const RegisterProvider = ({ children }) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      account_id: '',
      name: '',
      password: '',
      passwordConfirmation: '',
      iconFile: '',
      iconUrl: '',
      vegeType: 'none',
      secretQuestion: '',
      secretAnswer: '',
      provider: '',
      provider_id: '',
    },
    mode: 'onChange',
  })

  return (
    <FormContext.Provider
      value={[register, setValue, handleSubmit, watch, errors]}>
      {children}
    </FormContext.Provider>
  )
}
