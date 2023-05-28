import { ReactNode, useRef, useState, useEffect } from 'react'
import { SlScreenSmartphone } from 'react-icons/sl'
import { RiComputerLine } from 'react-icons/ri'
import { NextPage } from 'next'
import Test11 from '@/components/Test1'
import Test22 from '@/components/Test2'

interface Props {}

const AnalysisTab: NextPage<Props> = (props): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<'mobile' | 'desktop'>('desktop')

  const handleTabClick = (tab: 'mobile' | 'desktop') => {
    setSelectedTab(tab)
  }

  return (
    <div>
      <div
        className='w-[250px] flex items-center justify-between mx-auto'
      >
        <div
          className={`flex items-center rounded border border-gray-300 p-2
          cursor-pointer space-x-2 hover:text-white hover:bg-gray-900
          ${selectedTab === 'mobile' ? 'text-white bg-gray-900' : ''}`}
           onClick={() => handleTabClick('mobile')}
        >
          <SlScreenSmartphone size={26} />
          <p className='text-sm'>携帯電話</p>
        </div>
        <div
          className={`flex items-center rounded border border-gray-300 p-2
          cursor-pointer space-x-2 hover:text-white hover:bg-gray-900
          ${selectedTab === 'desktop' ? 'text-white bg-gray-900' : ''}`}
          onClick={() => handleTabClick('desktop')}
        >
          <RiComputerLine size={26} />
          <p className='text-sm'>デスクトップ</p>
        </div>
      </div>
      <div>
        {selectedTab === 'mobile' && <Test11 />}
        {selectedTab === 'desktop' && <Test22 />}
      </div>
    </div>
  )
}

export default AnalysisTab
