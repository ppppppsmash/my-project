import { Button } from '@tremor/react'

interface Props {
  label: string
  clickEvent: () => void
}

export default function RegistrationButton({label, clickEvent}: Props) {

  return (
    <Button
      className='w-[150px] bg-gray-900 hover:bg-gray-700
      py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
      duration-150 focus:shadow-outline ease-in-out'
      color='gray'
      onClick={clickEvent}
    >
      {label}
    </Button>
  )
}
