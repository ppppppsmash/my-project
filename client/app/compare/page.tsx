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
  UserTtfb = 'user_ttfb'
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
      const latestMetricsA = siteA?.siteMetrics[0]
      const latestMetricsB = siteB?.siteMetrics[0]
      console.log(latestMetricsB)
      const result: CompareResult = {}

      if(latestMetricsA && latestMetricsB) {
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
