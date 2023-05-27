import { NextPage } from 'next/types'
import {RiLoader2Fill} from 'react-icons/ri'



interface Props {}

const Loading: NextPage<Props> = (props): JSX.Element => {
  return (
    <div className='flex flex-col items-center justify-center'>

      <RiLoader2Fill
        className='animate-spin'
        size={40}
      />
      <p className='text-center mt-1 font-semibold'>Loading.....</p>
    </div>
  )
}

export default Loading