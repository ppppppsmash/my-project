import { FC } from 'react'

interface Props {}

const page: FC<Props> = (props): JSX.Element => {
  return (
    <div className='w-[66%] mx-auto'>
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'>計測対象URL</h2>
      </div>
      <div className='flex items-center justify-center space-x-3'>
        <div className='w-full'>
          <input id='url' name='url' type='text'
            className='w-full border-solid border-2 border-gray-300
            focus:outline-none focus:border-gray-500 rounded p-2'
            placeholder='https://example.com'
          />
        </div>
        <div className='w-2/12'>
          <button
            className='w-full bg-gray-900 hover:bg-gray-700 text-white
            font-bold py-2 px-4 rounded active:bg-gray-500 active:scale-[1]
            duration-150 focus:shadow-outline ease-in-out hover:scale-[0.95]'
          >
            分析
          </button>
        </div>
      </div>
    </div>
  )
}

export default page