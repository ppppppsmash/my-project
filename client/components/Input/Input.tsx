import { TextInput } from '@tremor/react'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({placeholder, handleChange}: Props) {
  return (
    <TextInput
      className='ring-gray-950 focus:ring-gray-800 placeholder:text-xs placeholder:text-gray-400'
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
