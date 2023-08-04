import { ChangeEvent } from 'react'
import { useState } from 'react'

interface Props {
  device: string
  checkEvent?: (value: string) => void
}

export default function PsiCheckbox({ device, checkEvent }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const checked = event.target.checked
    setIsChecked(checked)
    console.log(value, checked)
    checkEvent && checkEvent(value)
  }

  return (
    <div className="flex items-center space-x-2 py-6">
      <input
        type="checkbox"
        className="border-gray-300 rounded h-5 w-5 accent-gray-900"
        value={device}
        checked={isChecked}
        onChange={handleCheck}
      />
      <p>{device}</p>
    </div>
  )
}
