import { ChangeEvent, useState } from 'react'

interface Props {
  device: string
  checkEvent?: (value: string) => void
}

export default function RegistrationCheckbox({ device, checkEvent }: Props) {
  const [isChecked, setIsChecked] = useState(false)

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const checked = event.target.checked
    setIsChecked(checked)
    console.log(value, checked)
    checkEvent && checkEvent(value)
  }

  return (
    <div className="flex items-center space-x-3 py-6">
      <input
        className='border-gray-300 rounded h-4 w-4 accent-gray-900 transition duration-700'
        type="checkbox"
        value={device}
        checked={isChecked}
        onChange={handleCheck}
      />
      <p className='text-sm'>{device}</p>
    </div>
  )
}
