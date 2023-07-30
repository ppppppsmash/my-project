import { NextPage } from 'next'
import { PSIDataType } from '@/type'
import { usePathname } from 'next/navigation'

interface Props {
  label: string
}

export default function PageToButton({label}: Props) {
  // const handleClick = () => {
  //   const router = usePathname()
  //   return router
  // }

  return (
    <button
      className='w-2/12 bg-gray-900 hover:bg-gray-700 text-white text-sm
      font-bold py-2 px-4 rounded active:bg-gray-500
      duration-150 focus:shadow-outline ease-in-out'
    >
      {label}
    </button>
  )
}
