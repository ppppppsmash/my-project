import { PSIDataType } from '@/type'
import { NextPage } from 'next'

interface Props {
  label: string
  getScore: (id: number) => void
  id: number
}

export default function AnalysisButton({label, getScore, id}: Props) {
  const handleClick = () => {
    getScore(id)
  }

  return (
    <button
      className='w-full bg-gray-900 hover:bg-gray-700 text-white
      font-bold py-2 px-4 rounded active:bg-gray-500 active:scale-[1]
      duration-150 focus:shadow-outline ease-in-out hover:scale-[0.95]'
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
