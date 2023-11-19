'use client'

import PsiListTab from '@/components/PsiListTab'
import PsiTable from '@/components/PsiTable'
import PsiChartForTable from '@/components/PsiChartForTable'

export default function PsiList() {
  return (
    <div className={`dark:bg-gray-950`}>
      <PsiListTab
        childrenA={
          <PsiTable />
        }
        childrenB={
          <PsiChartForTable />
        }
        textA='表組み一覧'
        textB='チャート一覧'
      />
    </div>
  )
}
