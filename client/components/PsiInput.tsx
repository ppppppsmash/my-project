import { TextInput } from '@tremor/react'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PsiInput({placeholder, handleChange}: Props) {
  return (
    <TextInput
      className='ring-gray-950 focus:ring-gray-800'
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
