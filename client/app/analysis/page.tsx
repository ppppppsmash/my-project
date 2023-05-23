import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'

interface Props {}

const page: NextPage<Props> = (props): JSX.Element => {
  return (
    <div className='w-[66%] mx-auto'>
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'>計測対象URL</h2>
      </div>
      <div className='flex items-center justify-center space-x-3'>
        <div className='w-full'>
          <AnalysisInput />
        </div>
        <div className='w-2/12'>
          <AnalysisButton
            label='分析'
          />
        </div>
      </div>
    </div>
  )
}

export default page