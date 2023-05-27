'use client'
import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import AnalysisTable from '@/components/Table/AnalysisTable'
import { useState } from 'react'
import { ApiResultType, pageList } from '@/type'

interface Props extends ApiResultType {}

const page: NextPage<Props> = (props): JSX.Element => {
  const [urlName, setUrlName] = useState('')
  const [url, setUrl] = useState('')

  const [results, setResults] = useState<Props>()

  const [scoreUpdate, setScoreUpdate] = useState('')

  const getChangeUrlName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrlName(target.value)
  }

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const getScore = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}`, {
      cache: 'no-store'
    })

    if (res.ok) {
      const { result } = await res.json()
      const { lighthouseResult } = result

      const { categories } = lighthouseResult
      const { performance } = categories
      const score = String(performance.score * 100)

      const { audits } = lighthouseResult
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
        name: urlName,
        url: url,
        date: new Date().toLocaleString(),
        score,
        fcp: fcp.displayValue,
        lcp: lcp.numericValue,
      }

      setResults((prevState) => ({
        ...prevState, ...psiData
      }))
    }
  }

  const getScoreAgain = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}`, {
      cache: 'no-store'
    })

    if (res.ok) {
      const { result } = await res.json()
      const { lighthouseResult } = result

      const { categories } = lighthouseResult
      const { performance } = categories
      const score = String(performance.score * 100)
      const date = new Date().toLocaleString()

      setResults((prevState) => ({
        ...prevState, date, score
      }))
    }
  }

  return (
    <div className='w-[80%] mx-auto'>
      <section className='mb-5'>
        <div className='text-center mb-2'>
          <h2 className='text-2xl font-semibold'></h2>
        </div>
        <div className=''>
          <div className='mb-2'>
            <AnalysisInput
              placeholder='サイト名'
              handleChange={getChangeUrlName}
            />
          </div>
          <div className='mb-2'>
            <AnalysisInput
              placeholder='https://example.com'
              handleChange={getChangeUrl}
            />
          </div>
        </div>
        <div>
          <div className='w-2/12'>
            <AnalysisButton
              label='登録'
              handleScore={getScore}
            />
          </div>
        </div>
      </section>
      { results &&
        <section>
        <div>
          <AnalysisTable
            name={results.name}
            url={results.url}
            score={results.score}
            date={results.date}
            getScoreAgain={getScoreAgain}
          />
        </div>
      </section>
      }
    </div>
  )
}

export default page