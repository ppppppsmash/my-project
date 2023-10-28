import { NextPage } from 'next/types'
import PacmanLoader from 'react-spinners/PacmanLoader'

interface Props {}

export default function Loading() {
  return (
    <div className='fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center enter enter-active'>
      <div className='flex items-center justify-center space-x-2 w-full px-6 py-4 overflow-hidden rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl shadow-md'>

        <PacmanLoader size='20' color='#FFFFFF' />

      </div>
    </div>
  )
}
