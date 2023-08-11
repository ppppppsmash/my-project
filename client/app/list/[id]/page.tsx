'use client'
import { Suspense, useEffect, useState } from 'react'
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
      const data = await getData('api', id)
      const updatedList = [data].map((item: PSIDataType) => ({
        id: item.id,
        device: item.device,
        name: item.name,
        url: item.url,
        score: item.score,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        schedule: item.schedule,
        lcp: Number(item.lcp?.replace(/,/g, '').split(/\s/)[0]),
        fid: Number(item.fid?.replace(/,/g, '').split(/\s/)[0]) / 1000, // ms -> s
        cls: Number(item.cls?.replace(/,/g, '').split(/\s/)[0]),
        fcp: Number(item.fcp?.replace(/,/g, '').split(/\s/)[0]),
        tbt: Number(item.tbt?.replace(/,/g, '').split(/\s/)[0]),
      }))
      setPageList(updatedList)
    }
    console.log(pageList)
    fetchData()
  }, [id])

  return (
    <div>
      {pageList.length > 0 && pageList.map((page, index) => (
        <>
        <Grid
          key={index}
          className='gap-6 mt-6 mb-6'
          //numColsMd={4}
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
              <Bold className={`text-[45px] ${page.score >= 70 ? 'text-green-500' : 'text-red-500'}`}>{page.score}</Bold>
            </Card>
          </Col>
        </Grid>

        <Grid
          className='gap-6 mt-6 mb-6'
          numColsLg={4}
        >
          <Col numColSpanLg={1}>
            <Card>
              <Text>LCP: {page.lcp}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>FID: {page.fid}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>CLS: {page.cls}</Text>
            </Card>
          </Col>
          <Col numColSpanLg={1}>
            <Card>
              <Text>FCP: {page.fcp}</Text>
            </Card>
          </Col>
        </Grid>


        <Card>
          <Text>TBT: {page.tbt}</Text>
        </Card>

        <Flex className='space-x-4 mt-4'>
        <Card className='w-full'>
          <Text>LCP: {page.lcp}</Text>
          <LineChart
            data={pageList}
            index='date'
            categories={['lcp']}
            colors={['emerald']}
            yAxisWidth={40}
          />
        </Card>
        <Card className='w-full'>
          <Text>FID: {page.fid}</Text>
          <LineChart
            data={pageList}
            index='date'
            categories={['fid']}
            colors={['rose']}
            yAxisWidth={40}
          />
        </Card>
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
        </>
      ))}
    </div>
  )
}
