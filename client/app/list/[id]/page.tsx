'use client'
import { useEffect, useState } from 'react'
import { getData } from '@/utils/fetchData'
import { PSIDataType } from '@/type'
import { Grid, Col, Flex, Card, Text, Title, Subtitle, Bold, Italic, LineChart, Tracker, Color } from '@tremor/react'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, ClockIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

interface Props {
  params: { id: number }
}

interface Tracker {
  color: Color
  tooltip: string
}

export default function Slug({ params: { id } }: Props) {
  const [pageList, setPageList] = useState<PSIDataType[]>([])

  const [scoreStatus, setScoreStatus] = useState<string>('')

  const data: Tracker[] = [
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "rose", tooltip: "Downtime" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "gray", tooltip: "Maintenance" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "emerald", tooltip: "Operational" },
    { color: "yellow", tooltip: "Degraded" },
    { color: "emerald", tooltip: "Operational" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id)
      setPageList([data])
    }
    console.log(pageList)
    fetchData()
  }, [id])

  console.log(pageList)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getData('psi_site_list', id);
  //     const updatedList = data.map((item: PSIDataType) => {
  //       const updatedSiteMetrics = {
  //         score: parseFloat(item.siteMetrics.score),
  //         lcp: parseFloat(item.siteMetrics.lcp),
  //         fid: parseFloat(item.siteMetrics.fid),
  //         cls: parseFloat(item.siteMetrics.cls),
  //         fcp: parseFloat(item.siteMetrics.fcp),
  //         tbt: parseFloat(item.siteMetrics.tbt),
  //         si: parseFloat(item.siteMetrics.si),
  //       };
  
  //       return {
  //         id: item.id,
  //         device: item.device,
  //         name: item.name,
  //         url: item.url,
  //         createdAt: item.createdAt,
  //         updatedAt: item.updatedAt,
  //         schedule: item.schedule,
  //         siteMetrics: updatedSiteMetrics,
  //       };
  //     });
  
  //     setPageList(updatedList);
  //   };
  
  //   fetchData();
  // }, [id]);
  

  return (
    <div>
      {pageList.length > 0 && pageList.map((page, index) => (
        <div key={index}>
          <Grid
            className='gap-6 mt-6 mb-6'
            numColsLg={6}
          >
            <Col numColSpanLg={5}>
              <Card>
                <Title>{page.name}</Title>
                <Subtitle className='flex items-center space-x-2'>
                  <Link
                    target='_blank'
                    href={{pathname: page.url}}
                  >
                    {page.url}
                  </Link>
                  <ArrowTopRightOnSquareIcon className='w-4 h-4' />
                </Subtitle>
                <div className='flex items-center space-x-5 mt-4'>
                  <Text className='flex items-center space-x-2'>
                    <ClockIcon className='w-4 h-4' />
                    <span>
                      {formatDate(page.updatedAt) || formatDate(page.createdAt)}
                    </span>
                  </Text>

                  <Text>
                    {page.device === 'mobile' ? (
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
                      {page.schedule}
                    </span>
                  </Text>
                </div>
              </Card>
            </Col>
            <Col numColSpanLg={1}>
              <Card className='h-full text-center'>
                <Text>Score</Text>
                {page.siteMetrics.map((metrics, index) => (
                  <Bold className={`text-[45px] ${metrics.score >= 70 ? 'text-green-500' : 'text-red-500'}`}>{metrics.score}</Bold>
                ))}
              </Card>
            </Col>
          </Grid>

          <Grid
            className='gap-6 mt-6 mb-6'
            numColsLg={4}
          >
            <Col numColSpanLg={1}>
              <Card>
              {page.siteMetrics.map((metrics, index) => (
                <Text>LCP: {metrics.lcp}</Text>
              ))}
              </Card>
            </Col>
            <Col numColSpanLg={1}>
              <Card>
              {page.siteMetrics.map((metrics, index) => (
                <Text>FID: {metrics.fid}</Text>
              ))}
              </Card>
            </Col>
            <Col numColSpanLg={1}>
              <Card>
              {page.siteMetrics.map((metrics, index) => (
                <Text>CLS: {metrics.cls}</Text>
              ))}
              </Card>
            </Col>
            <Col numColSpanLg={1}>
              <Card>
              {page.siteMetrics.map((metrics, index) => (
                <Text>FCP: {metrics.fcp}</Text>
              ))}
              </Card>
            </Col>
          </Grid>


          <Card>
          {page.siteMetrics.map((metrics, index) => (
            <Text>TBT: {metrics.tbt}</Text>
          ))}
          </Card>

          <Flex className='space-x-4 mt-4'>
            {page.siteMetrics.map((metrics, index) => (
            <Card className='w-full'>
              <Text>LCP: {metrics.lcp}</Text>
              <LineChart
                data={pageList}
                index='date'
                categories={['lcp']}
                colors={['emerald']}
                yAxisWidth={40}
              />
            </Card>
            ))}
            {page.siteMetrics.map((metrics, index) => (
              <Card className='w-full'>
                <Text>FID: {metrics.fid}</Text>
                <LineChart
                  data={pageList}
                  index='date'
                  categories={['fid']}
                  colors={['rose']}
                  yAxisWidth={40}
                />
              </Card>
            ))}
          </Flex>
          <Flex className='space-x-4 mt-4'>
            <Card className="w-full">
              <Title>Status</Title>
              <Text>Lena&apos;s Webshop &bull; May 2022</Text>
              <Flex justifyContent="end" className="mt-4">
                <Text>Uptime 92%</Text>
              </Flex>
              <Tracker data={data} className="mt-2" />
            </Card>
            <Card className="w-full">
              <Title>Status</Title>
              <Text>Lena&apos;s Webshop &bull; May 2022</Text>
              <Flex justifyContent="end" className="mt-4">
                <Text>Uptime 92%</Text>
              </Flex>
              <Tracker data={data} className="mt-2" />
            </Card>
          </Flex>
        </div>
      ))}
    </div>
  )
}
