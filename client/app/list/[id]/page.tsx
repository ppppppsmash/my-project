'use client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getData } from '@/lib/fetchData'
import { PSIDataType } from '@/type'

interface Props {
  params: { id: number }
}

const page: NextPage<Props> = ({params: { id }}): JSX.Element => {
  const [pageList, setPageList] = useState<PSIDataType[]>([])



  useEffect(() => {
    const getSingleData = async () => {
      const res = await getData('pageList', id)
      setPageList(res[0])
    }

    getSingleData()
  }, [])
  return (
    <div className='w-full mx-auto'>
      {pageList.map((page) => (
        <>
          <p>ID: {page?.id}</p>
          <p>サイト名: {page?.name}</p>
          <p>URL: {page?.url}</p>
          <p>スコア: {page?.score}</p>
          <p>日付: {page?.date}</p>
          <p>スコア: {page?.score}</p>
          <p>LCP: {page?.lcp}</p>
          <p>FID: {page?.fid}</p>
          <p>CLS: {page?.cls}</p>
          <p>FCP: {page?.fcp}</p>
          <p>TBT: {page?.tbt}</p>
        </>
      ))}
    </div>
  )
}

export default page