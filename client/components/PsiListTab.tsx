import { DocumentTextIcon, ChartPieIcon } from '@heroicons/react/24/solid'

import {
  TabList,
  Tab
} from '@tremor/react'

import { useState } from 'react'

export default function PsiListTab({
  childrenA, childrenB
} : {
  childrenA: React.ReactNode
  childrenB: React.ReactNode
}
) {
  const [showCard, setShowCard] = useState(true)
  return (
    <div>
      <>
        <TabList
          color='zinc'
          defaultValue='1'
          onValueChange={(value) => setShowCard(value === '1')}
          className='mt-6 text-gray-950'
        >
          <Tab value='1' text='表組み一覧' icon={DocumentTextIcon} />
          <Tab value='2' text='チャート一覧' icon={ChartPieIcon} />
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