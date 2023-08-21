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

interface Props {}
export default function Compare() {
  const [siteList, setSiteList] = useState<PSIDataType[]>([])


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

      <Card className='mt-6'>
        <Flex className='space-x-4'>

            <PsiSelectBox
              siteList={siteList}
            />

          <Card>

          </Card>
        </Flex>
      </Card>
    </>
  )
}
