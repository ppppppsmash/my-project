'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Title, Flex, Card, Text, LineChart, BarChart, Color as TremorColor } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowsPointingInIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import { PSIDataType, PSIMetrics } from '@/type'
import { getDataAll } from '@/utils/fetchData'
import { metricsFormatter, metricsFormatterSingle } from '@/utils/graphDataFormatter'

interface Props {
  siteMetrics: PSIMetrics[]
  categories: string[]
}

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
}

export default function PsiChartForTable() {
  const { data: session, status } = useSession()

  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const [siteData, setSiteData] = useState<PSIDataType[]>([])

  const formattedCategories = (category: string) : string => {
    switch (category) {
      case 'siteMetrics[0].user_fcp':
        return 'Largest Contentful Paint'
      case 'fcp':
        return 'First Contentful Paint'
      case 'cls':
        return 'Cumulative Layout Shift'
      case 'tbt':
        return 'Total Blocking Time'
      case 'tti':
        return 'Time to Interactive'
      case 'si':
        return 'Speed Index'
      default:
        return category
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const datas = await getDataAll('psi_site_list', Number(session?.user?.id))
      setSiteData(datas)

      const test = datas.map((data: any, index: number) => {
        return data.siteMetrics
      })
      const test2 = Object.entries(test).map((key: any, value: any) => {
        return ({
          [key]: value
        })
      })
    }
    fetchData()
  }, [])

  return (
    <Card className='w-full box-border p-2 -mx-2 dark:bg-gray-950'>
      <div className='w-full p-2'>
        <Title className='dark:text-white mb-5'>チャート一覧</Title>
        <LineChart
          data={siteData}
          index='name'
          categories={[`siteMetrics[0].score`, `siteMetrics[0].user_fcp`, `siteMetrics[0].user_lcp`,
           `siteMetrics[0].user_fid`, `siteMetrics[0].user_cls`, `siteMetrics[0].user_inp`,
           `siteMetrics[0].user_ttfb`
          ]}
          colors={colors}
          yAxisWidth={40}
          className='dark:text-white'
        />
      </div>
    </Card>
  )
}
