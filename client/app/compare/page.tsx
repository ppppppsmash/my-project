'use client'
import { useEffect, useState } from 'react'
import PsiSelectBox from '@/components/PsiSelectBox'
import {
  Card,
  Title,
  Flex,
  Button,
  SelectBox, SelectBoxItem
} from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import { getDataAll } from '@/utils/fetchData'
import PsiCompareList from '@/components/PsiCompareList'

interface Props {}
export default function Compare() {
  const [siteList, setSiteList] = useState<PSIDataType[]>([])
  const [selectedSiteLeft, setSelectedSiteLeft] = useState<PSIDataType | null>(null)
  const [selectedSiteRight, setSelectedSiteRight] = useState<PSIDataType | null>(null)

  const handleSelectChangeLeft = (value: string) => {
    const selectedSite = siteList.find(site => site.name === value) || null
    setSelectedSiteLeft(selectedSite)
  }

  const handleSelectChangeRight = (value: string) => {
    const selectedSite = siteList.find(site => site.name === value) || null
    setSelectedSiteRight(selectedSite)
  }


  useEffect(()=> {
    const getDataByAll = async () => {
      const data = await getDataAll('psi_site_list')
      setSiteList(data)
    }
    getDataByAll()
  }, [])

  return (
    <>
      <Title>ページ比較</Title>


    <Flex className='space-x-4 items-start'>
      <Card className='mt-6'>
        <Flex className='mb-8 space-x-4'>
          <PsiSelectBox
            siteList={siteList}
            onSiteSelect={handleSelectChangeLeft}
          />
        </Flex>

        {selectedSiteLeft &&
          <PsiCompareList
            siteList={selectedSiteLeft}
          />
        }
      </Card>

      <Card className='mt-6'>
        <Flex className='mb-8 space-x-4'>
          <PsiSelectBox
            siteList={siteList}
            onSiteSelect={handleSelectChangeRight}
          />
        </Flex>

        {selectedSiteRight &&
          <PsiCompareList
            siteList={selectedSiteRight}
          />
        }
      </Card>
    </Flex>
    </>
  )
}
