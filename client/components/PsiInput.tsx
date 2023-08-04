import { TextInput } from '@tremor/react'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PsiInput({placeholder, handleChange}: Props) {
  return (
    <TextInput
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
