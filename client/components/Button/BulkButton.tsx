import { Button } from '@tremor/react'
import { BoltIcon } from '@heroicons/react/24/solid'

interface Props {
  label: string
  clickEvent: () => void
}

export default function BulkButton({ label, clickEvent }: Props) {

  return (
    <div className='from-pink-400 to-violet-600 rounded-lg p-[2px]
    hover:from-violet-400 hover:to-pink-600 hover:scale-[0.95] transition duration-300
    dark:from-amber-200 dark:to-sky-400 dark:hover:from-sky-200 dark:hover:to-amber-400
    bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.pink.400)_30%,theme(colors.slate.100)_40%,theme(colors.violet.400)_20%)]
    dark:bg-[conic-gradient(from_var(--shimmer-angle),theme(colors.sky.400)_30%,theme(colors.slate.100)_40%,theme(colors.amber.400)_20%)]
    animate-[shimmer_2.5s_linear_infinite]'>
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
