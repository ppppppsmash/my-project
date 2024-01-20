'use client'

import { useEffect, useState } from 'react'
import { Grid, Col, Card, Text, Title, Subtitle, Flex, DonutChart } from '@tremor/react'
import PsiMotionModalsChart from '@/components/PsiMotionModalsChart'
import { PSIDataType, PSIMetrics } from '@/type'
import { getData } from '@/utils/fetchData'
import { metricsFormatter } from '@/utils/graphDataFormatter'
import GPTHoverCard from '@/components/HoverCard/GPTHoverCard'
import { BoltIcon } from '@heroicons/react/24/solid'

interface Props {
  id: number
}

export default function SiteDetail({ id }: Props) {
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])

  const metricsNewest = siteMetrics.length > 0 ? siteMetrics[siteMetrics.length - 1] : null

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('psi_site_list', id)
      const formattedMetrics = metricsFormatter(data.siteMetrics)
      setSiteMetrics(formattedMetrics)
    }
    fetchData()
  }, [id])

  return (
    <>
      <Title className='mt-10 dark:text-white border-b-2 border-b-black dark:border-b-white'>ユーザーパフォーマンス</Title>
      <Text className='text-xs mt-4 font-semibold'>
        <div className='flex gap-x-1 items-center'>
          <BoltIcon className='w-6 h-6 text-yellow-400' />
          <span>マークをマウスオーバーしたらchatGPTから改善策を答えてくれるよ.</span>
        </div>
      </Text>
      <Grid
        className='gap-6 mt-6 mb-6'
        numColsLg={6}
      >
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>First Contentful Paint (FCP): <strong>{metricsNewest && metricsNewest?.user_fcp / 1000} s</strong></Text>
              <GPTHoverCard message={`First Contentful Paint (FCP): ${metricsNewest && metricsNewest?.user_fcp / 1000}s`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>Largest Contentful Paint (LCP): <strong>{metricsNewest && metricsNewest?.user_lcp / 1000} s</strong></Text>
              <GPTHoverCard message={`Largest Contentful Paint (LCP): ${metricsNewest && metricsNewest?.user_lcp / 1000}s`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>First Input Delay (FID): <strong>{metricsNewest && metricsNewest?.user_fid} ms</strong></Text>
              <GPTHoverCard message={`First Input Delay (FID): ${metricsNewest && metricsNewest?.user_fid}ms`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>Cumulative Layout Shift (CLS): <strong>{metricsNewest && metricsNewest?.user_cls}</strong></Text>
              <GPTHoverCard message={`Cumulative Layout Shift (CLS): ${metricsNewest && metricsNewest?.user_cls}`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>Interaction to Next Paint (INP): <strong>{metricsNewest && metricsNewest?.user_inp / 1000} s</strong></Text>
              <GPTHoverCard message={`Interaction to Next Paint (INP): ${metricsNewest && metricsNewest?.user_inp / 1000}s`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
          </Card>
        </Col>
        <Col numColSpanLg={3}>
          <Card className='dark:bg-gray-950 group'>
            <Flex>
              <Text className='dark:text-white'>Time to First Byte (TTFB): <strong>{metricsNewest && metricsNewest?.user_ttfb / 1000} s</strong></Text>
              <GPTHoverCard message={`Time to First Byte (TTFB): ${metricsNewest && metricsNewest?.user_ttfb / 1000}s`}>
                <div className='cursor-pointer'>
                  <BoltIcon
                    className='text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-600
                      hover:scale-[1.3] w-6 h-6 hover:rotate-180'
                  />
                </div>
              </GPTHoverCard>
            </Flex>
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
    </>
  )
}