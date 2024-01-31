import { Button } from '@tremor/react'
import { BoltIcon } from '@heroicons/react/24/solid'

interface Props {
  label: string
  clickEvent: () => void
}

export default function BulkButton({ label, clickEvent }: Props) {

  return (
    <div className='bg-gradient-to-r from-pink-400 to-violet-600 rounded-lg p-[2px]
      hover:from-violet-400 hover:to-pink-600 hover:scale-[0.95] transition duration-300
      active:from-violet-600 active:to-pink-600'>
      <Button
        className='w-[120px] rounded-lg bg-gray-950 hover:scale-[0.99] transition duration-300 hover:bg-gray-950'
        color='gray'
        onClick={clickEvent}
      >
        <div className='flex items-center gap-x-1'>
          <BoltIcon className='w-4 h-4 text-yellow-300 transition group-hover:rotate-180' />
          <span className='font-extrabold'>{label}</span>
        </div>
      </Button>
    </div>
  )
}
