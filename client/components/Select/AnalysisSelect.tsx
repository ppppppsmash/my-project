import { NextPage } from 'next'
import { FC } from 'react'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function AnalysisSelect({ placeholder, handleChange }: Props) {
  return (
    <select
      className='bg-gray-900 border border-gray-800 text-gray-900 text-sm
        rounded focus:ring-rounded focus:ring-gray-500 focus:border-gray-500
        block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
    >
      <option>{placeholder}</option>
      <option value='9'>9:00~</option>
      <option value='10'>10:00~</option>
    </select>
  )
}
