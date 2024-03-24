import {
  Text,
  Card
} from '@tremor/react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { getDataAll } from "@/utils/fetchData"
import { PSIDataType, SortType } from '@/type'
import Link from 'next/link'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

export default function HistorySiteList() {
  const { data: session, status } = useSession()

  const getDataByAll = async () => {
    const data = await getDataAll('psi_site_list', Number(session?.user?.id))
    return data
  }

  const { data: result } = useQuery<NewPSIDataType[]>({
    queryKey: ['history_result'],
    queryFn: getDataByAll,
    refetchInterval: 10000
  })

  const siteResult = (result: any) => {
    if (result && result.length > 0) {
      const sites = result?.map((item: any, index: number) => {
        const id = item.id
        const name = item.siteMetrics[0]?.name
        const score = item.siteMetrics[0]?.score

        return { id, name, score }
      })

      if (sites) {
        return sites.filter((site: any) => site.score !== undefined)
      }
    }

    return []
  }

  const sites = siteResult(result)

  const id = sites.map((item: any, index: number) => {
    return item.id
  })
  const name = sites.map((item: any, index: number) => {
    return item.name
  })
  const scores = sites.map((item: any, index: number) => {
    return item.score
  })

  const maxScore = scores && Math.max.apply(null, scores)
  const minScore = scores && Math.min.apply(null, scores)

  const siteIdMax = scores && maxScore && sites && sites[scores.indexOf(maxScore)]?.id
  const siteNameMax = scores && maxScore && sites && sites[scores.indexOf(maxScore)]?.name

  const siteIdMin = scores && minScore && sites && sites[scores.indexOf(minScore)]?.id
  const siteNameMin = scores && minScore && sites && sites[scores.indexOf(minScore)]?.name

  return (
    <>
    { result && result?.length > 0 &&
      <div className='w-full'>
        <Card>
          <Text>登録している項目数： {result?.length}</Text>
          <Text className='mt-3'>
            TOP SCORE：
            <Link href={{ pathname: `/list/${siteIdMax}` }} className='underline'>
              {siteNameMax}
            </Link>
            <span className='pl-4 text-green-500 font-semibold'>{ maxScore }</span>
          </Text>
          <Text className='mt-1'>
            BOTTOM SCORE：
            <Link href={{ pathname: `/list/${siteIdMin}` }} className='underline'>
              {siteNameMin}
            </Link>
            <span className='pl-4 text-red-500 font-semibold'>{ minScore }</span>
          </Text>
        </Card>
      </div>
    }
    </>
  )
}
