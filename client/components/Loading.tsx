import { NextPage } from 'next/types'
import {RiLoader2Fill} from 'react-icons/ri'



interface Props {}

export default function Loading() {
  return (
    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter enter-active'>
      <div className='flex items-center justify-center space-x-2 w-full px-6 py-4 overflow-hidden rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl shadow-md'>

        <RiLoader2Fill
          className='animate-spin text-white'
          size={40}
        />
        <p className='text-center mt-1 font-semibold text-white'>Loading.....</p>

      </div>
    </div>
  )
}
