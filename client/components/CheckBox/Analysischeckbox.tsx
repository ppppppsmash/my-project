import { NextPage } from 'next'
import { FC } from 'react'

interface Props {
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AnalysisCheckbox: NextPage<Props> = ({handleChange}): JSX.Element => {
  return (
    <>
      <div className="flex items-start space-x-3 py-6">
        <input type="checkbox" className="border-gray-300 rounded h-5 w-5" />
        <p>Desktop</p>
      </div>
      <div className="flex items-start space-x-3 py-6">
        <input type="checkbox" className="border-gray-300 rounded h-5 w-5" />
        <p>Mobile</p>
      </div>
    </>
  )
}

export default AnalysisCheckbox