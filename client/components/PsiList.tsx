'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import PsiListTab from '@/components/PsiListTab'
import PsiTable from '@/components/PsiTable'
import PsiChartForTable from '@/components/PsiChartForTable'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { metricsFormatter } from '@/utils/graphDataFormatter'

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
      />
    </div>
  )
}
