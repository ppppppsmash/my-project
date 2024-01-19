import { Button } from '@tremor/react'

interface Props {
  label: string
  clickEvent: () => void
}

export default function BulkButton({ label, clickEvent }: Props) {

  return (
    <Button
      className='w-[120px] bg-gradient-to-r from-pink-400 to-violet-600
      py-2 px-4 active:bg-gray-500 dark:bg-white dark:text-gray-950
      duration-150 focus:shadow-outline ease-in-out text-xs rounded-md'
      color='gray'
      onClick={clickEvent}
    >
      <span className='font-light'>{label}</span>
    </Button>
  )
}
