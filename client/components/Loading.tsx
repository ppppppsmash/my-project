import { NextPage } from 'next/types'
import {RiLoader2Fill} from 'react-icons/ri'



interface Props {}

export default function Loading() {
  return (
    <div className='flex flex-col items-center justify-center mt-5'>

      <RiLoader2Fill
        className='animate-spin'
        size={40}
      />
      <p className='text-center mt-1 font-semibold'>Loading.....</p>
    </div>
  )
}
