// DetailChart.tsx
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { Title, Card, LineChart, Color as TremorColor } from '@tremor/react'
import { getData } from '@/utils/fetchData'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import { PSIDataType, PSIMetrics } from '@/type'
import { DatePicker } from '../PopOver/DatePicker'
import { format, parse } from 'date-fns'
import { formatDate, datePickerFormatDate } from '@/utils/formatDate'

interface Props {
  id: number
}

export default function DetailChart({ id }: Props) {
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedMetrics, setSelectedMetrics] = useState<PSIMetrics[]>([])

  const metricsNewest = siteMetrics.length > 0 ? siteMetrics[siteMetrics.length - 1] : null

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id);
      const formattedMetrics = metricsFormatter(data.siteMetrics)

      const metricsWithDateAsDate = formattedMetrics.map(metrics => ({
        ...metrics,
        createdAt: metrics.createdAt
      }));

      setSiteMetrics(metricsWithDateAsDate)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (selectedDate) {
      const matchingMetrics = siteMetrics.filter((metrics) => {
        const array1 = metrics.createdAt.split(' ')
        console.log(selectedDate.toString(), datePickerFormatDate(selectedDate.toString()))
        return array1[0] === datePickerFormatDate(selectedDate.toString())
      })
      setSelectedMetrics(matchingMetrics)
    } else {
      setSelectedMetrics(siteMetrics)
    }
  }, [selectedDate, siteMetrics])

  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const chartUserCategories: string[] = ['score', 'user_fcp', 'user_lcp', 'user_fid', 'user_cls', 'user_inp', 'user_ttfb']
  const chartLabCategories: string[] = ['score', 'fcp', 'lcp', 'tti', 'cls', 'tbt', 'si']

  console.log(selectedDate)

  return (
    <>
      <Card className='w-full box-border p-2 -mx-2 dark:bg-gray-950'>
        <div className='w-full p-2'>
          <Title className='dark:text-white mb-5'>ユーザーパフォーマンス</Title>

          {/* 注意: selectedDate はそのまま渡す */}
          <DatePicker
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <LineChart
            data={selectedMetrics}
            index='createdAt'
            categories={chartUserCategories}
            colors={colors}
            yAxisWidth={40}
            className='dark:text-white'
          />
        </div>
      </Card>

      <Card className='w-full box-border p-2 mt-10 -mx-2 dark:bg-gray-950'>
        <div className='w-full p-2'>
          <Title className='dark:text-white mb-5'>ラボパフォーマンス</Title>

          <LineChart
            data={selectedMetrics}
            index='createdAt'
            categories={chartLabCategories}
            colors={colors}
            yAxisWidth={40}
            className='dark:text-white'
          />
        </div>
      </Card>
    </>
  );
}
