import { useEffect, useState } from 'react'
import { Title, Card, LineChart, Color as TremorColor } from '@tremor/react'
import { getData } from '@/utils/fetchData'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import { PSIDataType, PSIMetrics } from '@/type'
import { DatePicker } from '@/components/PopOver/DatePicker'
import { subMonths } from 'date-fns'
import { datePickerFormatDate } from '@/utils/formatDate'
import { DatePickerWithRange } from '@/components/PopOver/DatePickerWithRange'

interface Props {
  id: number
}

export default function DetailChart({ id }: Props) {
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])
  const [selectedMetrics, setSelectedMetrics] = useState<PSIMetrics[]>([])

  const [from, setFrom] = useState<any>(undefined)
  const [to, setTo] = useState<any>(undefined)
  const [defaultMonth, setDefaultMonth] = useState<any>('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id)
      const formattedMetrics = metricsFormatter(data.siteMetrics)

      const metricsWithDateAsDate = formattedMetrics.map(metrics => ({
        ...metrics,
        createdAt: metrics.createdAt
      }))

      setSiteMetrics(metricsWithDateAsDate)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const matchingMetrics = siteMetrics.filter((metrics) => {
      const period = metrics.createdAt.split(' ')
      const createdAt = new Date(datePickerFormatDate(period[0]))
      setDefaultMonth(subMonths(createdAt, 1))

      if (from && to) {
        return createdAt >= from && createdAt <= to
      }

      return true
    })

    setSelectedMetrics(matchingMetrics)
  }, [siteMetrics, from, to])


  const colors: TremorColor[] = ['rose', 'emerald', 'orange', 'lime', 'violet', 'pink']
  const chartUserCategories: string[] = ['score', 'user_fcp', 'user_lcp', 'user_fid', 'user_cls', 'user_inp', 'user_ttfb']
  const chartLabCategories: string[] = ['score', 'fcp', 'lcp', 'tti', 'cls', 'tbt', 'si']

  return (
    <>
      <Card className='w-full box-border p-2 -mx-2 dark:bg-gray-950'>
        <div className='w-full p-2'>
          <Title className='dark:text-white mb-5'>ユーザーパフォーマンス</Title>


          <DatePickerWithRange
            selectedDateFrom={from}
            selectedDateTo={to}
            onSelectDateFrom={setFrom}
            onSelectDateTo={setTo}
            defaultMonth={defaultMonth}
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
  )
}
