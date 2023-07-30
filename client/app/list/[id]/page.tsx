'use client'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getData } from '@/utils/fetchData'
import { PSIDataType } from '@/type'

interface Props {
  params: { id: number }
}

export default function Slug({params: { id }}: Props) {
  const [pageList, setPageList] = useState<PSIDataType[]>([])
  console.log(pageList)

  const getPageData = async () => {
    const res = await getData('api', id)
    setPageList([res])
  }

  useEffect(() => {
    getPageData()
  }, [])

  return (
    <div className='w-full mx-auto'>
      {pageList.length > 0 && pageList.map((page) => (
        <>
          <p key={page.id}>ID: {page.id}</p>
          <p>サイト名: {page.name}</p>
          <p>URL: {page.url}</p>
          <p>スコア: {page.score}</p>
          <p>日付: {page.date}</p>
          <p>スコア: {page.score}</p>
          <p>LCP: {page.lcp}</p>
          <p>FID: {page.fid}</p>
          <p>CLS: {page.cls}</p>
          <p>FCP: {page.fcp}</p>
          <p>TBT: {page.tbt}</p>
          <p>DEVICE: {page.device}</p>
        </>
      ))}

    </div>
  )
}
