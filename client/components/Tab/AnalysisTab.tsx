import { FC, ReactNode } from 'react'
import { ApiResultType } from '@/type'
import { SlScreenSmartphone } from 'react-icons/sl'
import { RiComputerLine } from 'react-icons/ri'
import { NextPage } from 'next'

interface Props {
  children: ReactNode
}

const AnalysisTab: NextPage<Props> = ({children}): JSX.Element => {
  return (
    <div>
      <div className='w-[250px] flex items-center justify-between mx-auto'>
        <div
          className='flex items-center rounded border border-gray-300 p-2
          cursor-pointer space-x-2 hover:text-white hover:bg-gray-900'
          >
          <SlScreenSmartphone size={26} />
          <p className='text-sm'>携帯電話</p>
        </div>
        <div
          className='flex items-center rounded border border-gray-300 p-2
          cursor-pointer space-x-2 hover:text-white hover:bg-gray-900'
        >
          <RiComputerLine size={26} />
          <p className='text-sm'>デスクトップ</p>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

export default AnalysisTab