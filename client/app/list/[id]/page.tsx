'use client'
import { Suspense, useEffect, useState } from 'react'
import { getData } from '@/utils/fetchData'
import { PSIDataType } from '@/type'
import { Flex, Card, Text, Title, LineChart, Tracker, Color } from '@tremor/react'
import { formatDate } from '@/utils/formatDate'

interface Props {
  params: { id: number }
}

interface Tracker {
  color: Color
  tooltip: string
}

export default function Slug({ params: { id } }: Props) {
  const [pageList, setPageList] = useState<PSIDataType[]>([])

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
        <div key={index}>
          <Title>サイト名: {page.name}</Title>
          <Title>URL: {page.url}</Title>
          <Text>スコア: {page.score}</Text>
          <Text>Date: {formatDate(page.updatedAt) || formatDate(page.createdAt)}</Text>
          <Text>Schedule: {page.schedule}</Text>
          <Text>Score: {page.score}</Text>
          <Text>LCP: {page.lcp}</Text>
          <Text>FID: {page.fid}</Text>
          <Text>CLS: {page.cls}</Text>
          <Text>FCP: {page.fcp}</Text>
          <Text>TBT: {page.tbt}</Text>
          <Text>DEVICE: {page.device}</Text>

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

        </div>
      ))}
    </div>
  )
}
