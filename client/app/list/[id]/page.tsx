'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { Grid, Col, Card, Text, Title, Subtitle, Bold, DonutChart, Accordion, AccordionHeader, AccordionBody, AccordionList } from '@tremor/react'
import { ArrowTopRightOnSquareIcon, ClockIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import DelaySection from '@/components/DelaySection'
import PsiMotionModals from '@/components/PsiMotionModalsChart'
import PsiMotionUserModalsChart from '@/components/PsiMotionUserModalsChart'
import PsiMotionModalsChart from '@/components/PsiMotionModalsChart'
import GPTHoverCard from '@/components/GPTHoverCard'

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
      const formattedMetrics = metricsFormatter(data.siteMetrics)
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
        <>
          <div className='flex gap-x-2 mb-6'>
            <Text className='dark:text-white'><Link className='underline decoration-dotted' href='/list'>ページ一覧</Link></Text>
            <Text className='dark:text-white'> / </Text>
            <Text className='dark:text-white'>{list.name}</Text>
          </div>
          <Grid key={index}
            className='gap-6 mt-6 mb-6'
            numColsLg={6}
          >
            <Col numColSpanSm={5}>
              <Card className='dark:bg-gray-950 mt-6'>
                <Title className='dark:text-white'>{list.name}</Title>
                <Subtitle className='flex items-center space-x-2 dark:text-white'>
                  <Link
                    target='_blank'
                    href={{pathname: list.url}}
                  >
                    {list.url}
                  </Link>
                  <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                </Subtitle>
                <div className='sm:flex items-center sm:space-x-5 sm:space-y-0 space-y-2 mt-4'>
                  <Text className='flex items-center space-x-2 dark:text-white'>
                    <ClockIcon className='w-4 h-4' />
                    <span>
                      {formatDate(list.updatedAt) || formatDate(list.createdAt)}
                    </span>
                  </Text>

                  <Text className='dark:text-white'>
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
                  <Text className='flex items-center space-x-2 dark:text-white'>
                    <CalendarDaysIcon className='w-4 h-4' />
                    <span>
                      {list.schedule}
                    </span>
                  </Text>
                </div>
              </Card>
            </Col>
            <Col numColSpanSm={1}>
              {/* <Card className='h-full text-center dark:bg-gray-950'> */}
                {/* <Text className='dark:text-white'>Score</Text> */}
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
                      colors={["emerald", "neutral"]}
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
                      colors={["rose", "neutral"]}
                    />
                  )}
              {/* </Card> */}
            </Col>
          </Grid>
        </>
      ))}

      <Title className='mt-10 dark:text-white border-b-2 border-b-black dark:border-b-white'>ユーザー体験パフォーマンス</Title>
      <Grid
        className='gap-6 mt-6 mb-6'
        numColsLg={6}
      >
        <Col numColSpanLg={3}>
          <GPTHoverCard message={`First Contentful Paint (FCP): ${metricsNewest && metricsNewest?.user_fcp / 1000}s`}>
            <Card className='dark:bg-gray-950'>
              <Text className='dark:text-white'>First Contentful Paint (FCP): <strong>{metricsNewest && metricsNewest?.user_fcp / 1000} s</strong></Text>
            </Card>
          </GPTHoverCard>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Largest Contentful Paint (LCP): <strong>{metricsNewest && metricsNewest?.user_lcp / 1000} s</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>First Input Delay (FID): <strong>{metricsNewest && metricsNewest?.user_fid} ms</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Cumulative Layout Shift (CLS): <strong>{metricsNewest && metricsNewest?.user_cls}</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Interaction to Next Paint (INP): <strong>{metricsNewest && metricsNewest?.user_inp / 1000} s</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Time to First Byte (TTFB): <strong>{metricsNewest && metricsNewest?.user_ttfb / 1000} s</strong></Text>
          </Card>
        </Col>
      </Grid>

      <Title className='mt-10 dark:text-white border-b-2 border-b-black dark:border-b-white'>ラボパフォーマンス</Title>
      <Grid
        className='gap-6 mt-6 mb-6'
        numColsLg={6}
      >
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Largest Contentful Paint: <strong>{metricsNewest?.lcp} s</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Time to Interactive: <strong>{metricsNewest?.tti} s</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Cumulative Layout Shift Score: <strong>{metricsNewest?.cls}</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>First Contentful Paint: <strong>{metricsNewest?.fcp} s</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Total Blocking Time: <strong>{metricsNewest?.tbt} ms</strong></Text>
          </Card>
        </Col>
        <Col numColSpanLg={2}>
          <Card className='dark:bg-gray-950'>
            <Text className='dark:text-white'>Speed Index: <strong>{metricsNewest?.si} s</strong></Text>
          </Card>
        </Col>
      </Grid>
      <div className='mt-4'>
        <PsiMotionModalsChart
          categories={['lcp', 'tti', 'cls', 'fcp', 'tbt', 'si']}
          siteMetrics={siteMetrics}
        />
      </div>
    </DelaySection>
  )
}
