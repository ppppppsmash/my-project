import { NextPage } from 'next'
import { FC } from 'react'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AnalysisInput({placeholder, handleChange}: Props) {
  return (
    <input id='url' name='url' type='text'
      className='w-full border-solid border-2 border-gray-300
      focus:outline-none focus:border-gray-500 rounded p-2'
      placeholder={placeholder}
      onChange={handleChange}
    />
  )
}
