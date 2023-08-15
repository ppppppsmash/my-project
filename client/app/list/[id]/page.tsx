'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { Grid, Col, Flex, Card, Text, Title, Subtitle, Bold, LineChart, Color } from '@tremor/react'
import { ArrowTopRightOnSquareIcon, ClockIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import { AnimatePresence, motion } from 'framer-motion'
import DelaySection from '@/components/DelaySection'

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
                    <div className='flex items-center space-x-2'>
                      <DevicePhoneMobileIcon className='w-4 h-4' />
                      <span>
                        MOBILE
                      </span>
                    </div>
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <ComputerDesktopIcon className='w-4 h-4' />
                        <span>
                          COMPUTER
                        </span>
                      </div>
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

        <Grid
          className='gap-6 mt-6 mb-6'
          numColsLg={4}
        >
          <Col numColSpanLg={1}>
            <Card>
              <Text>LCP: {metricsNewest?.lcp}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>FID: {metricsNewest?.fid}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>CLS: {metricsNewest?.cls}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>FCP: {metricsNewest?.fcp}</Text>
            </Card>
          </Col>
        </Grid>


        <Card>
          <Text>TBT: {metricsNewest?.tbt}</Text>
        </Card>

        <div className=''>
            <AnimatePresence>
              {selectedId && (
                <motion.div layoutId={selectedId}>
                  <motion.button onClick={() => setSelectedId(null)} />
                  <LineChart
                    data={siteMetrics}
                    index='createdAt'
                    categories={['lcp']}
                    colors={['emerald']}
                    yAxisWidth={40}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        <Flex className='space-x-4 mt-4'>
          <Card className='w-full'>
            <motion.div
                layoutId='1'
                onClick={() => setSelectedId('1')}
              >
              <Bold>LCP</Bold>
              <LineChart
                data={siteMetrics}
                index='createdAt'
                categories={['lcp']}
                colors={['emerald']}
                yAxisWidth={40}
              />
            </motion.div>

          </Card>
          <Card className='w-full'>
            <Text>FID</Text>
            <LineChart
              data={siteMetrics}
              index='createdAt'
              categories={['fid']}
              colors={['rose']}
              yAxisWidth={40}
            />
          </Card>
        </Flex>
    </DelaySection>
  )
}
