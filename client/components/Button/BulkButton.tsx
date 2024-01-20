import { Button } from '@tremor/react'
import { BoltIcon } from '@heroicons/react/24/solid'

interface Props {
  label: string
  clickEvent: () => void
}

export default function BulkButton({ label, clickEvent }: Props) {

  return (
    <Button
      className='w-[120px] bg-gradient-to-r from-pink-400 to-violet-600 transition
      py-2 px-4 active:bg-gray-500 dark:bg-white dark:text-gray-950 shadow-sm group
      duration-300 focus:shadow-outline ease-in-out text-xs rounded-md focus:from-violet-600 focus:to-pink-400'
      color='gray'
      onClick={clickEvent}
    >
      <div className='flex items-center gap-x-1'>
        <BoltIcon className='w-4 h-4 text-yellow-300 transition group-hover:rotate-180' />
        <span className='font-light'>{label}</span>
      </div>
    </Button>
  )
}
