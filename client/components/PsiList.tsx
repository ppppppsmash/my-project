'use client'

import PsiListTab from '@/components/PsiListTab'
import PsiTable from '@/components/PsiTable'
import LineChartList from '@/components/Charts/LineChartList'
import BarChartList from '@/components/Charts/BarChartList'

export default function PsiList() {
  return (
    <div className={`dark:bg-gray-950`}>
      <PsiListTab
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
