'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Title, Card, LineChart, Color as TremorColor } from '@tremor/react'
import { getData } from '@/utils/fetchData'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import { PSIDataType, PSIMetrics } from '@/type'

interface Props {
  id: number
}

export default function DetailChart({ id }: Props) {
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])

  const metricsNewest = siteMetrics.length > 0 ? siteMetrics[siteMetrics.length - 1] : null

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id)
      const formattedMetrics = metricsFormatter(data.siteMetrics)

      setSiteMetrics(formattedMetrics)
    }
    fetchData()
  }, [id])

  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const chartCategories: string[] = ['score', 'user_fcp', 'user_lcp', 'user_fid', 'user_cls', 'user_inp', 'user_ttfb']

  return (
    <Card className='w-full box-border p-2 -mx-2 dark:bg-gray-950'>
      <div className='w-full p-2'>
        <Title className='dark:text-white mb-5'>チャート詳細一覧</Title>
        <LineChart
          data={siteMetrics}  // 配列を渡す
          index='updatedAt'
          categories={chartCategories}
          colors={colors}
          yAxisWidth={40}
          className='dark:text-white'
        />
      </div>
    </Card>
  )
}
