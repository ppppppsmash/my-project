import { DocumentTextIcon, ChartPieIcon } from '@heroicons/react/24/solid'
import {
  TabList,
  Tab
} from '@tremor/react'

import { useState } from 'react'

export default function TabForList({
  childrenA, childrenB, textA, textB
} : {
  childrenA: React.ReactNode
  childrenB: React.ReactNode
  textA: string
  textB: string
}
) {
  const [showCard, setShowCard] = useState(true)

  return (
    <div>
      <>
        <TabList
          color='gray'
          defaultValue='1'
          onValueChange={(value) => setShowCard(value === '1')}
          className='mt-6 text-gray-950'
        >
          <Tab
            className='text-gray-900 dark:text-white'
            value='1'
            text={textA}
            icon={DocumentTextIcon} />
          <Tab
            className='text-gray-900 dark:text-white'
            value='2'
            text={textB}
            icon={ChartPieIcon} />
        </TabList>
      </>

      {showCard === true ? (
        <div className='mt-6'>
          {childrenA}
        </div>
      ) : (
        <div className='mt-6'>
          {childrenB}
        </div>
      )}
    </div>
  );
};