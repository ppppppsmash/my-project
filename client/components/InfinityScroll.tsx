import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import MoonLoader from 'react-spinners/MoonLoader'

export default function InfiniteScrollBox({
    children,
} : {
    children: React.ReactNode
}) {
  const [list, setList] = useState(
    Array.from({ length: 12 }, () => children)
  )

  const fetchMoreData = () => {
    setTimeout(() => {
      setList([...list, Array.from({ length: 2 }, () => children)])
    }, 500)
  }

  const loader = (
    <div className='flex justify-center'>
        <MoonLoader size={32} color='black' />
    </div>
  )

  return (
    <div className='h-[600px] overflow-auto w-full'>
      <InfiniteScroll
        dataLength={list.length}
        next={fetchMoreData}
        hasMore={true}
        loader={loader}
        height={600}
      >
        {list}
      </InfiniteScroll>
    </div>
  )
}
