'use client'
import { NextPage } from 'next'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import AnalysisTable from '@/components/Table/AnalysisTable'
import { useState } from 'react'
import { ApiResultType } from '@/type'
import Loading from '@/components/Loading'
import AnalysisTableAll from '@/components/Table/AnalysisTableAll'
import AnalysisTab from '@/components/Tab/AnalysisTab'

interface Props extends ApiResultType {}

const page: NextPage<Props> = (props): JSX.Element => {
  const [urlName, setUrlName] = useState('')
  const [url, setUrl] = useState('')

  const [results, setResults] = useState<Props>()
  const [pageList, setPageList] = useState<Props[]>([])
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'desktop'>('desktop');

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const getChangeUrlName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrlName(target.value)
  }

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const handleDeviceSelection = (device: 'mobile' | 'desktop') => {
    console.log(device)
    setSelectedDevice(device);
  };

  console.log(selectedDevice)

  const getPsiInfo = async() => {
    setLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${url}&strategy=${selectedDevice}`, {
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

      setPageList((prevState) => [...prevState, psiData])

      setVisible(true)
      setLoading(false)
    }
  }

  const getScoreAgain = async () => {
    setLoading(true)
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

      const psiData = {
        date,
        score
      }

      setResults((prevState) => ({
        ...prevState, date, score
      }))

      setPageList(prevState =>
        prevState.map(item => {
          if (item.url === url) {
            return { ...item, ...psiData }
          }
          return item
        })
      )

      setLoading(false)
    }
  }

  return (
    <div className='w-[80%] mx-auto'>
      <section className='mb-10'>
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
              handleScore={getPsiInfo}
            />
          </div>
        </div>
      </section>

      <AnalysisTab
      >
      { loading && <Loading /> }
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

      { visible &&
        <section>
          <AnalysisTableAll
            pageList={pageList}
            getScoreAgain={getScoreAgain}
          />
        </section>
      }
      </AnalysisTab>
    </div>
  )
}

export default page