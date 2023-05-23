'use client'
import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import { useState } from 'react'
import { ApiResultType } from '@/type'

interface Props {
  initialData?: ApiResultType
}

const Page: NextPage<Props> = ({ initialData }: Props): JSX.Element => {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<ApiResultType | undefined>(initialData)

  const getChangeUrl = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const getUrl = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}`, {
      cache: 'no-store'
    })

    if (res.ok) {
      const data = await res.json()
      const lighthouseResult = data.result.lighthouseResult;
      const categories = data.result.lighthouseResult.categories;
      const loadingExperience = data.result.loadingExperience;
      const analysisUTCTimestamp = data.result.analysisUTCTimestamp;
      const audits = data.result.lighthouseResult.audits;

      console.log(lighthouseResult, loadingExperience,analysisUTCTimestamp, audits)
    }
  }

  return (
    <div className='w-[66%] mx-auto'>
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'>計測対象URL</h2>
      </div>
      <div className='flex items-center justify-center space-x-3'>
        <div className='w-full'>
          <AnalysisInput handleUrlChange={getChangeUrl} />
        </div>
        <div className='w-2/12'>
          <AnalysisButton label='分析' handleScore={getUrl} />
        </div>
      </div>


    </div>
  )
}

export default Page