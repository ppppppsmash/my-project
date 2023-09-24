'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { Grid, Col, Card, Text, Title, Subtitle, Bold, DonutChart } from '@tremor/react'
import { ArrowTopRightOnSquareIcon, ClockIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import DelaySection from '@/components/DelaySection'
import PsiMotionModals from '@/components/PsiMotionModalsChart'
import PsiMotionModalsChart from '@/components/PsiMotionModalsChart'

interface Props {
  params: { id: number }
}

export default function Slug({ params: { id } }: Props) {
  const [siteList, setSiteList] = useState<PSIDataType[]>([])
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])

  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id)
      const formattedMetrics = data.siteMetrics
      setSiteList([data])
      setSiteMetrics(formattedMetrics)
    }
    fetchData()
  }, [id])

  console.log(siteList)
  console.log(siteMetrics)

  const metricsNewest = siteMetrics.length > 0 ? siteMetrics[siteMetrics.length - 1] : null

  const restScore = 100 - (metricsNewest?.score ?? 0)

  const createDonutScore = (data: any) => {
    const newData = data.map((item: any) => ({
      ...item,
      score: item.score,
    }))
    const latestItemInNewData = newData[newData.length - 1]
    const restScore = 100 - (metricsNewest?.score ?? 0)

    const resultData = [latestItemInNewData, { score: restScore }]

    return resultData
  }

  const valueFormatter = (number: number) => `$ ${Intl.NumberFormat("us").format(number).toString()}`


  return (
    <DelaySection delay={0.3}>
      {siteList.length > 0 && siteList.map((list, index) => (
        <Grid key={index}
          className='gap-6 mt-6 mb-6'
          numColsLg={6}
        >
          <Col numColSpanLg={4}>

            <div className='flex gap-x-2 mb-6'>
              <Text><Link className='underline decoration-dotted' href='/list'>ページ一覧</Link></Text>
              <Text> / </Text>
              <Text>{list.name}</Text>
            </div>

            <Card>
              <Title>{list.name}</Title>
              <Subtitle className='flex items-center space-x-2'>
                <Link
                  target='_blank'
                  href={{pathname: list.url}}
                >
                  {list.url}
                </Link>
                <ArrowTopRightOnSquareIcon className='w-4 h-4' />
              </Subtitle>
              <div className='flex items-center space-x-5 mt-4'>
                <Text className='flex items-center space-x-2'>
                  <ClockIcon className='w-4 h-4' />
                  <span>
                    {formatDate(list.updatedAt) || formatDate(list.createdAt)}
                  </span>
                </Text>

                <Text>
                  {list.device === 'mobile' ? (
                    <span className='flex items-center space-x-2'>
                      <DevicePhoneMobileIcon className='w-4 h-4' />
                      <span>
                        MOBILE
                      </span>
                    </span>
                    ) : (
                      <span className='flex items-center space-x-2'>
                        <ComputerDesktopIcon className='w-4 h-4' />
                        <span>
                          DESKTOP
                        </span>
                      </span>
                    )
                  }
                </Text>
                <Text className='flex items-center space-x-2'>
                  <CalendarDaysIcon className='w-4 h-4' />
                  <span>
                    {list.schedule}
                  </span>
                </Text>
              </div>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card className='h-full text-center'>
              <Text>Score</Text>
                { metricsNewest && metricsNewest.score >= 70 ?
                (
                  <DonutChart
                    data={createDonutScore(siteMetrics)}
                    showTooltip={false}
                    category="score"
                    index="index"
                    valueFormatter={(number: number) =>
                      `${Number(Intl.NumberFormat("us").format(number)) - restScore}`
                    }
                    className='mt-2'
                    colors={["emerald", "slate"]}
                  />
                ) : (
                  <DonutChart
                    data={createDonutScore(siteMetrics)}
                    showTooltip={false}
                    category="score"
                    index="index"
                    valueFormatter={(number: number) =>
                      `${Number(Intl.NumberFormat("us").format(number)) - restScore}`
                    }
                    className='mt-2'
                    colors={["rose", "slate"]}
                  />
                )}
            </Card>
          </Col>
        </Grid>
        ))}

        <Title className='mt-10'>ユーザー体験パフォーマンス</Title>
        <Grid
          className='gap-6 mt-6 mb-6'
          numColsLg={6}
        >
          <Col numColSpanLg={2}>
            <Card>
              <Text>First Contentful Paint (FCP): <strong>{metricsNewest && metricsNewest?.user_fcp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Largest Contentful Paint (LCP): <strong>{metricsNewest && metricsNewest?.user_lcp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>First Input Delay (FID): <strong>{metricsNewest && metricsNewest?.user_fid} ms</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Cumulative Layout Shift (CLS): <strong>{metricsNewest && metricsNewest?.user_cls}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Interaction to Next Paint (INP): <strong>{metricsNewest && metricsNewest?.user_inp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Time to First Byte (TTFB): <strong>{metricsNewest && metricsNewest?.user_ttfb / 1000} s</strong></Text>
            </Card>
          </Col>
        </Grid>

        <div className='mt-4'>
          <PsiMotionModalsChart
            categories={['user_lcp', 'user_lcp', 'user_cls', 'user_fcp', 'user_inp', 'user_ttfb']}
            siteMetrics={siteMetrics}
          />
        </div>

        <Title className='mt-10'>ラボスパフォーマンス</Title>
        <Grid
          className='gap-6 mt-6 mb-6'
          numColsLg={6}
        >
          <Col numColSpanLg={2}>
            <Card>
              <Text>Largest Contentful Paint: <strong>{metricsNewest?.lcp}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Time to Interactive: <strong>{metricsNewest?.tti}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Cumulative Layout Shift Score: <strong>{metricsNewest?.cls}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>First Contentful Paint: <strong>{metricsNewest?.fcp}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Total Blocking Time: <strong>{metricsNewest?.tbt}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Speed Index: <strong>{metricsNewest?.si}</strong></Text>
            </Card>
          </Col>
        </Grid>

        {/* <div className='mt-4'>
          <PsiMotionModalsChart
            categories={['lcp', 'tti', 'cls', 'fcp', 'tbt', 'si']}
            siteMetrics={metricsFormatter(siteMetrics)}
          />
        </div> */}
    </DelaySection>
  )
}
