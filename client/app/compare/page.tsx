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

enum MetricType {
  Score = 'score',
  Lcp = 'lcp',
  Tti = 'tti',
  Cls = 'cls',
  Fcp = 'fcp',
  Tbt = 'tbt',
  Si = 'si',
  UserFcp = 'user_fcp',
  UserLcp = 'user_lcp',
  UserFid = 'user_fid',
  UserCls = 'user_cls',
  UserInp = 'user_inp',
  UserTtfb = 'user_ttfb',
}

type CompareResult = {
  [key in MetricType]?: React.ReactNode
}

export default function Compare() {
  const [siteList, setSiteList] = useState<PSIDataType[]>([])
  const [selectedSiteLeft, setSelectedSiteLeft] = useState<PSIDataType | null>(null)
  const [selectedSiteRight, setSelectedSiteRight] = useState<PSIDataType | null>(null)
  const [selectedDateLeft, setSelectedDateLeft] = useState<string>('')
  const [selectedDateRight, setSelectedDateRight] = useState<string>('')
  const [compareResultLeft, setCompareResultLeft] = useState<CompareResult>({})
  const [compareResultRight, setCompareResultRight] = useState<CompareResult>({})

  useEffect(() => {
    const getData = async () => {
      const data = await getDataAll('psi_site_list')
      setSiteList(data)
    }
    getData()
  }, [])

  const handleSiteSelect = (
    value: string,
    setSelectedSite: React.Dispatch<React.SetStateAction<PSIDataType | null>>,
    selectedDate: string,
    setSelectedDate: React.Dispatch<React.SetStateAction<string>>,
    setResult: React.Dispatch<React.SetStateAction<CompareResult>>,
    selectedSiteOpposite: PSIDataType | null
  ) => {
    const selectedSite = siteList.find((site) => site.id.toString() === value) || null
    setSelectedSite(selectedSite)
    setSelectedDate(selectedDate)
    compareMetrics(selectedSite, selectedSiteOpposite, setResult)
  }

  const compareMetrics = (
    siteA: PSIDataType | null,
    siteB: PSIDataType | null,
    setResult: React.Dispatch<React.SetStateAction<CompareResult>>
  ) => {
    if (siteA && siteB) {
      const latestMetricsA = siteA.siteMetrics.find((metrics) => metrics.createdAt === selectedDateLeft)
      const latestMetricsB = siteB.siteMetrics.find((metrics) => metrics.createdAt === selectedDateRight)

      console.log(selectedDateLeft, selectedDateRight)
      const result: CompareResult = {}

      if (latestMetricsA && latestMetricsB) {
        for (const metricType in latestMetricsA) {
          if (latestMetricsA.hasOwnProperty(metricType) && latestMetricsB.hasOwnProperty(metricType)) {
            result[metricType as MetricType] = compareMark(
              latestMetricsA[metricType as MetricType],
              latestMetricsB[metricType as MetricType],
              metricType
            )
          }
        }
      }
      setResult(result)
    }
  }

  const compareMark = (valueA: number | string | undefined, valueB: number | string | undefined, metricType: string) => {
    if(valueA && valueB) {
      const numericValueA = parseFloat(valueA.toString().replace(/,/g, '').split(/\s/)[0])
      const numericValueB = parseFloat(valueB.toString().replace(/,/g, '').split(/\s/)[0])

      if (metricType === MetricType.Score) {
        if (!isNaN(numericValueA) && !isNaN(numericValueB)) {
          if (numericValueA > numericValueB) {
            console.log(numericValueA, numericValueB)
            return <FaceSmileIcon className='w-5 h-5 text-green-500' />
          } else if (numericValueA < numericValueB) {
            return <FaceFrownIcon className='w-5 h-5 text-red-400' />
          } else {
            return <ArrowsRightLeftIcon className='w-5 h-5 text-yellow-400' />
          }
        }
      } else {

      if (!isNaN(numericValueA) && !isNaN(numericValueB)) {
        if (numericValueA > numericValueB) {
          console.log(numericValueA, numericValueB)
          return <FaceFrownIcon className='w-5 h-5 text-red-400' />
        } else if (numericValueA < numericValueB) {
          return <FaceSmileIcon className='w-5 h-5 text-green-500' />
        } else {
          return <ArrowsRightLeftIcon className='w-5 h-5 text-yellow-400' />
        }
      }
    }
  }
    return null
  }

  return (
    <>
      <Title className='dark:text-white'>ページ比較</Title>
      <Flex className='space-x-4 items-start'>
        <Card className='mt-6 shadow-md'>
          <Flex className='mb-8 space-x-4'>
            <PsiSelectBox
              siteList={siteList}
              onSiteSelect={(value, selectedDate) =>
                handleSiteSelect(value, setSelectedSiteLeft, selectedDate, setSelectedDateLeft, setCompareResultLeft, selectedSiteRight)
              }
            />
          </Flex>
          {selectedSiteLeft && (
            <PsiCompareList siteList={selectedSiteLeft} compareResult={compareResultLeft} selectedDate={selectedDateLeft} />
          )}
        </Card>
        <Card className='mt-6 shadow-md'>
          <Flex className='mb-8 space-x-4'>
            <PsiSelectBox
              siteList={siteList}
              onSiteSelect={(value, selectedDate) =>
                handleSiteSelect(value, setSelectedSiteRight, selectedDate, setSelectedDateRight, setCompareResultRight, selectedSiteLeft)
              }
            />
          </Flex>
          {selectedSiteRight && (
            <PsiCompareList siteList={selectedSiteRight} compareResult={compareResultRight} selectedDate={selectedDateRight} />
          )}
        </Card>
      </Flex>
    </>
  )
}
