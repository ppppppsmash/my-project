'use client'
import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import { useState } from 'react'
import { ApiResultType } from '@/type'

interface Props {
  initialData?: ApiResultType
}

const Page: NextPage<Props> = (props): JSX.Element => {
  const [url, setUrl] = useState('')
  const [results, setResults] = useState<
  ApiResultType
  >({})

  const getChangeUrl = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

    const getUrl = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}`, {
        cache: 'no-store'
      })

      if (res.ok) {
        const { result } = await res.json()
        const { lighthouseResult } = result

        const { categories } = lighthouseResult
        const { performance } = categories
        const score = String(performance.score * 100) // スコア

        const { audits } = lighthouseResult // audits
        const lcp = audits['largest-contentful-paint']
        const fid = audits['first-input-delay']
        const cls = audits['cumulative-layout-shift']
        const fcp = audits['first-contentful-paint']
        const tbt = audits['total-blocking-time']
        const si = audits['speed-index']
        const fci = audits['first-cpu-idle']
        const eil = audits['estimated-input-latency']
        const fmp = audits['first-meaningful-paint']
        const tti = audits['interactive']

        const psiData = {
          score,
          fcp: fcp.displayValue,
          lcp: lcp.numericValue,
        }

        setResults((prevState) => ({
          ...prevState, ...psiData
        }))
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

      <div>
        <p>
          {results.score}
          {results.fcp}
          {results.lcp}
        </p>
      </div>


    </div>
  )
}

export default Page