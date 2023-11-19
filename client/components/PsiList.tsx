'use client'

import PsiListTab from '@/components/PsiListTab'
import PsiTable from '@/components/PsiTable'

export default function PsiList() {


  return (
    <div className={`dark:bg-gray-950`}>
      <PsiListTab
        childrenA={
          <PsiTable />
        }
        childrenB={
          <div>
            123
          </div>
        }
      />
    </div>
  )
}
