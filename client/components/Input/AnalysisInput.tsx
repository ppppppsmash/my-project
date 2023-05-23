import { NextPage } from 'next'
import { FC } from 'react'

interface Props {
  handleUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AnalysisInput: NextPage<Props> = ({handleUrlChange}): JSX.Element => {
  return (
    <input id='url' name='url' type='text'
      className='w-full border-solid border-2 border-gray-300
      focus:outline-none focus:border-gray-500 rounded p-2'
      placeholder='https://example.com'
      onChange={(event) => handleUrlChange(event)}
    />
  )
}

export default AnalysisInput