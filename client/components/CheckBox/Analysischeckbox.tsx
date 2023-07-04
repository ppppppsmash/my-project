import { NextPage } from 'next'
import { FC, ChangeEvent } from 'react'

import { useState } from 'react'

interface Props {
  device: string
  checkEvent?: (value: string) => void
}

const AnalysisCheckbox: NextPage<Props> = ({ device, checkEvent }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const checked = event.target.checked
    setIsChecked(checked)
    console.log(value, checked)
    checkEvent && checkEvent(value)
  }

  return (
      <div className="flex items-start space-x-3 py-6">
        <input
          type="checkbox"
          className="border-gray-300 rounded h-5 w-5"
          value={device}
          checked={isChecked}
          onChange={handleCheck}
        />
        <p>{device}</p>
      </div>
  )
}

export default AnalysisCheckbox
