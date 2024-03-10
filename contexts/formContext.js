import { createContext, useState } from 'react'

export const FormContext = createContext()

const formContext = ({ children }) => {
  const [formData, setFormData] = useState({
    title: '',
    VegeTags: {
      vegan: false,
      oriental_vegetarian: false,
      ovo_vegetarian: false,
      pescatarian: false,
      lacto_vegetarian: false,
      frutarian: false,
      other_vegetarian: false,
    },
    thumbnail: '',
    tags: [],
    materials: [],
    time: '',
    steps: [],
    user_id: 1,
  })
  return (
    <FormContext.Provider value={[formData, setFormData]}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContext
