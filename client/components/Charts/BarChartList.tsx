'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Title, Card, BarChart, Color as TremorColor } from '@tremor/react'
import { getDataAll } from '@/utils/fetchData'
import { PSIDataType, PSIMetrics } from '@/type'

export default function BarChartList() {
  const { data: session } = useSession()

  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const chartCategories: string[] = ['score', 'user_fcp', 'user_lcp', 'user_fid', 'user_cls', 'user_inp', 'user_ttfb']

  const [siteData, setSiteData] = useState<PSIDataType[]>([])
  const [siteMetircs, setSiteMetircs] = useState<PSIMetrics[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const siteDatas = await getDataAll('psi_site_list', Number(session?.user?.id))
      setSiteData(siteDatas)

      const siteData = siteDatas.map((data: any) => {
        return data.siteMetrics[0]
      })
      setSiteMetircs(siteData)
    }
    fetchData()
  }, [])

  return (
    <Card className='w-full box-border p-2 -mx-2 dark:bg-gray-950'>
      <div className='w-full p-2'>
        <Title className='dark:text-white mb-5'>チャート一覧</Title>
        <BarChart
          data={siteMetircs}
          index='name'
          categories={chartCategories}
          colors={colors}
          yAxisWidth={40}
          className='dark:text-white'
        />
      </div>
    </Card>
  )
}
