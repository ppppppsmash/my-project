'use client'
import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import { useState } from 'react'

interface Props {}

const page: NextPage<Props> = (props): JSX.Element => {
  const [url, setUrl] = useState('')
  const [score, setScore] = useState('')

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }
  const getScore = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}`, {
      cache: 'no-store'
    })

    if (res.ok) {
      const data = await res.json()
      const score = data.score
      setScore(score)
    }
  }

  return (
    <div className='w-[66%] mx-auto'>
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'>計測対象URL</h2>
      </div>
      <div className='flex items-center justify-center space-x-3'>
        <div className='w-full'>
          <AnalysisInput
            handleUrlChange={getChangeUrl}
          />
        </div>
        <div className='w-2/12'>
          <AnalysisButton
            label='分析'
            handleScore={getScore}
          />
        </div>
      </div>

      <div>
        {score}
      </div>
    </div>
  )
}

export default page