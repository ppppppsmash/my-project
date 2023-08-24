'use client'
import { useEffect, useState } from 'react'
import PsiSelectBox from '@/components/PsiSelectBox'
import { Card, Title, Flex } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getDataAll } from '@/utils/fetchData'
import PsiCompareList from '@/components/PsiCompareList'
import { ArrowSmallUpIcon, ArrowSmallDownIcon, FaceSmileIcon, FaceFrownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import PsiMotionModalsChartTotal from '@/components/PsiMotionModalsChartTotal'
import { metricsFormatter } from '@/utils/graphDataFormatter'

interface Props {}

enum MetricType {
  Score = 'score',
  Lcp = 'lcp',
  Fid = 'fid',
  Cls = 'cls',
  Fcp = 'fcp',
  Tbt = 'tbt',
  Si = 'si',
}

type CompareResult = {
  [key in MetricType]?: React.ReactNode
}

export default function Compare() {
  const [siteList, setSiteList] = useState<PSIDataType[]>([])
  const [selectedSiteLeft, setSelectedSiteLeft] = useState<PSIDataType | null>(null)
  const [selectedSiteRight, setSelectedSiteRight] = useState<PSIDataType | null>(null)
  const [compareResultLeft, setCompareResultLeft] = useState<any>({})
  const [compareResultRight, setCompareResultRight] = useState<any>({})
  const [siteMetrics, setSiteMetrics] = useState<PSIMetrics[]>([])

  console.log(compareResultLeft)

  const compareMetrics = (
    siteA: PSIDataType | null,
    siteB: PSIDataType | null,
    setResult: React.Dispatch<React.SetStateAction<CompareResult>>
  ) => {
    if (siteA && siteB) {
      const latestMetricsA = siteA.siteMetrics[siteA.siteMetrics.length - 1]
      const latestMetricsB = siteB.siteMetrics[siteB.siteMetrics.length - 1]
      const result: CompareResult = {}

      for (const metricType in latestMetricsA) {
        if (latestMetricsA.hasOwnProperty(metricType) && latestMetricsB.hasOwnProperty(metricType)) {
          result[metricType as MetricType] = compareMark(
            latestMetricsA[metricType as MetricType],
            latestMetricsB[metricType as MetricType]
          )
        }
      }

      setResult(result)
    }
  }

  const compareMark = (valueA: number, valueB: number) => {
    if (valueA > valueB) {
      return <FaceSmileIcon className='w-5 h-5 text-green-500' />
    } else if (valueA < valueB) {
      return <FaceFrownIcon className='w-5 h-5 text-red-400' />
    } else {
      return <ArrowsRightLeftIcon className='w-5 h-5 text-yellow-400' />
    }
  }

  const handleSelectChange = (value: string, setSelectedSite: React.Dispatch<React.SetStateAction<PSIDataType | null>>) => {
    const selectedSite = siteList.find((site) => site.id.toString() === value) || null
    setSelectedSite(selectedSite)
  }

  useEffect(() => {
    const getDataByAll = async () => {
      const data = await getDataAll('psi_site_list')
      setSiteList(data)
    }
    getDataByAll()
  }, [])

  useEffect(() => {
    compareMetrics(selectedSiteLeft, selectedSiteRight, setCompareResultLeft)
    compareMetrics(selectedSiteRight, selectedSiteLeft, setCompareResultRight)
  }, [selectedSiteLeft, selectedSiteRight])

  console.log(selectedSiteLeft)

  return (
    <>
      <Title className='dark:text-white'>ページ比較</Title>

      <Flex className='space-x-4 items-start'>
        <Card className='mt-6 shadow-md'>
          <Flex className='mb-8 space-x-4'>
            <PsiSelectBox siteList={siteList} onSiteSelect={(value) => handleSelectChange(value, setSelectedSiteLeft)} />
          </Flex>

          {selectedSiteLeft && (
            <PsiCompareList siteList={selectedSiteLeft} compareResult={compareResultLeft} />
          )}
        </Card>

        <Card className='mt-6 shadow-md'>
          <Flex className='mb-8 space-x-4'>
            <PsiSelectBox siteList={siteList} onSiteSelect={(value) => handleSelectChange(value, setSelectedSiteRight)} />
          </Flex>

          {selectedSiteRight && (
            <PsiCompareList siteList={selectedSiteRight} compareResult={compareResultRight} />
          )}
        </Card>
      </Flex>
      <Card className='mt-6 shadow-md'>
        {selectedSiteLeft && selectedSiteRight &&
          //<PsiMotionModalsChartTotal siteMetrics={metricsFormatter(selectedSiteLeft.siteMetrics)} />

          <PsiMotionModalsChartTotal
            siteMetricsLeft={metricsFormatter(selectedSiteLeft.siteMetrics)}
            siteMetricsRight={metricsFormatter(selectedSiteRight.siteMetrics)}
          />
        }
        {/* {selectedSiteRight &&
          <PsiMotionModalsChartTotal siteMetrics={metricsFormatter(selectedSiteRight.siteMetrics)} />
        } */}
      </Card>
    </>
  )
}
