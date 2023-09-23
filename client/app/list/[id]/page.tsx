'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { Grid, Col, Card, Text, Title, Subtitle, Bold } from '@tremor/react'
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

  return (
    <DelaySection delay={0.3}>
      {siteList.length > 0 && siteList.map((list, index) => (
        <Grid key={index}
          className='gap-6 mt-6 mb-6'
          numColsLg={6}
        >
          <Col numColSpanLg={5}>
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
                          COMPUTER
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
          <Col numColSpanLg={1}>
            <Card className='h-full text-center'>
              <Text>Score</Text>
                <Bold className={`text-[45px] ${metricsNewest && metricsNewest.score >= 70 ? 'text-green-500' : 'text-red-500'}`}>{metricsNewest?.score}</Bold>
            </Card>
          </Col>
        </Grid>
        ))}

        <Title>ユーザー体験パフォーマンス</Title>
        <Grid
          className='gap-6 mt-6 mb-6'
          numColsLg={6}
        >
          <Col numColSpanLg={2}>
            <Card>
              <Text>First Contentful Paint (FCP): <strong>{metricsNewest?.user_fcp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Largest Contentful Paint (LCP): <strong>{metricsNewest?.user_lcp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>First Input Delay (FID): <strong>{metricsNewest?.user_fid} ms</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Cumulative Layout Shift (CLS): <strong>{metricsNewest?.user_cls}</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Interaction to Next Paint (INP): <strong>{metricsNewest?.user_inp / 1000} s</strong></Text>
            </Card>
          </Col>
          <Col numColSpanLg={2}>
            <Card>
              <Text>Time to First Byte (TTFB): <strong>{metricsNewest?.user_ttfb / 1000} s</strong></Text>
            </Card>
          </Col>
        </Grid>


        <Title>ラボスパフォーマンス</Title>
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

        <div className='mt-4'>
          <PsiMotionModalsChart
            categories={['lcp', 'tti', 'cls', 'fcp', 'tbt', 'si']}
            siteMetrics={metricsFormatter(siteMetrics)}
          />
        </div>
    </DelaySection>
  )
}
