import MoonLoader from 'react-spinners/MoonLoader'

interface Props {}

export default function Loading() {
  return (
    <div className='fixed inset-0 z-40 flex items-center bg-background/70 backdrop-blur-sm sm:justify-center enter enter-active'>
      <div className='flex items-center justify-center space-x-2 w-full px-6 py-4 overflow-hidden sm:m-4 sm:max-w-xl'>

        <MoonLoader size={40} color='black' />

      </div>
    </div>
  )
}
