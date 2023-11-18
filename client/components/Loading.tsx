import { NextPage } from 'next/types'
import PacmanLoader from 'react-spinners/PacmanLoader'
import SyncLoader from 'react-spinners/SyncLoader'

interface Props {}

export default function Loading() {
  return (
    <div className='fixed inset-0 z-40 flex items-center bg-black bg-opacity-70 sm:justify-center enter enter-active'>
      <div className='flex items-center justify-center space-x-2 w-full px-6 py-4 overflow-hidden sm:m-4 sm:max-w-xl'>

        <PacmanLoader size={20} color='#FFFFFF' />

      </div>
    </div>
  )
}
