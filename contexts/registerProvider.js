'use client'
import { createContext } from 'react'
import { useForm } from 'react-hook-form'

export const FormContext = createContext()

export const RegisterProvider = ({ children }) => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   password: '',
  //   reenteredPassword: '',
  //   iconFile: '',
  //   iconUrl: null,
  //   VegeType: 'none',
  //   secretQuestion: '',
  //   secretAnswer: '',
  // })

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
    },
    mode: 'onChange', // リアルタイムで入力値を取得する
  })

  return (
    <FormContext.Provider value={[register, setValue, handleSubmit, watch]}>
      {children}
    </FormContext.Provider>
  )
}
