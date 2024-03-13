'use client'

import TabForList from '@/components/Tab/Tab'
import PsiTable from '@/components/LayoutComponents/PsiTable'
import BarChartList from '@/components/Charts/BarChartList'

export default function TableTab() {
  return (
    <div className={`dark:bg-gray-950`}>
      <TabForList
        childrenA={
          <PsiTable />
        }
        childrenB={
          <BarChartList />
        }
        textA='表組み'
        textB='チャート'
      />
    </div>
  )
}
