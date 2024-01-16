'use client'

import TabForList from '@/components/Tab/Tab'
import PsiTable from '@/components/PsiTable'
import LineChartList from '@/components/Charts/LineChartList'
import BarChartList from '@/components/Charts/BarChartList'

export default function PsiList() {
  return (
    <div className={`dark:bg-gray-950`}>
      <TabForList
        childrenA={
          <PsiTable />
        }
        childrenB={
          <BarChartList />
        }
        textA='表組み一覧'
        textB='チャート一覧'
      />
    </div>
  )
}
