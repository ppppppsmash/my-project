import { NextPage } from 'next'
import { PSIDataType } from '@/type'
import { useRouter } from 'next/navigation'

interface Props {
  label: string
  pageTo: any
}

const PageToButton: NextPage<Props> = ({label, pageTo}): JSX.Element => {
  const handleClick = () => {
    const router = useRouter()
    router.push(pageTo)
  }

  return (
    <button
          className='w-2/12 bg-gray-900 hover:bg-gray-700 text-white text-sm
          font-bold py-2 px-4 rounded active:bg-gray-500
          duration-150 focus:shadow-outline ease-in-out'
          onClick={()=>{handleClick}}
        >
          {label}
        </button>
  )
}

export default PageToButton