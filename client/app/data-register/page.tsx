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
import { SlScreenSmartphone } from 'react-icons/sl'
import { RiComputerLine } from 'react-icons/ri'

interface Props extends ApiResultType {}

const page: NextPage<Props> = (props): JSX.Element => {
  const [urlName, setUrlName] = useState('')
  const [url, setUrl] = useState('')

  const [results, setResults] = useState<Props>()
  const [mobileResults, setMobileResults] = useState<Props>()
  // const [desktopResults, setDesktopResults] = useState<Props>()
  const [pageList, setPageList] = useState<Props[]>([])
  const [mobilePageList, setMobilePageList] = useState<Props[]>([])
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'desktop'>('mobile')

  const [visible, setVisible] = useState(false)

  const [loading, setLoading] = useState(false)

  const getChangeUrlName = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrlName(target.value)
  }

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const handleDeviceSelection = (device: 'mobile' | 'desktop') => {
    setSelectedDevice(device);
  };

  const date = new Date().toLocaleString()

  const getPsiInfo = async() => {
    setLoading(true)

    if(selectedDevice === 'desktop') {
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
          date: date,
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
    } else if (selectedDevice === 'mobile') {
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
          date: date,
          score,
          fcp: fcp.displayValue,
          lcp: lcp.numericValue,
        }
  
        setMobileResults((prevState) => ({
          ...prevState, ...psiData
        }))
  
        setMobilePageList((prevState) => [...prevState, psiData])
  
        setVisible(true)
        setLoading(false)
      }
    }
  }

  const getScoreAgain = async () => {
    setLoading(true)
    if(selectedDevice === 'desktop') {
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
          // date: new Date().toLocaleString(),
          date: date,
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
    } else if (selectedDevice === 'mobile') {
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
          date: date,
          score,
          fcp: fcp.displayValue,
          lcp: lcp.numericValue,
        }
  
        setMobileResults((prevState) => ({
          ...prevState, ...psiData
        }))
  
        setMobilePageList((prevState) => [...prevState, psiData])
  
        setVisible(true)
        setLoading(false)
      }
    }
  }

  return (
    <div className='w-[80%] mx-auto'>
      <p>https://google.com</p>
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

      <section>
        <div
          className='w-[250px] flex items-center justify-between mx-auto'
        >
          <div
            className={`flex items-center rounded border border-gray-300 p-2
            cursor-pointer space-x-2 hover:text-white hover:bg-gray-900
            ${selectedDevice === 'mobile' ? 'text-white bg-gray-900' : ''}`}
            onClick={() => handleDeviceSelection('mobile')}
          >
            <SlScreenSmartphone size={26} />
            <p className='text-sm'>携帯電話</p>
          </div>
          <div
            className={`flex items-center rounded border border-gray-300 p-2
            cursor-pointer space-x-2 hover:text-white hover:bg-gray-900
            ${selectedDevice === 'desktop' ? 'text-white bg-gray-900' : ''}`}
            onClick={() => handleDeviceSelection('desktop')}
          >
            <RiComputerLine size={26} />
            <p className='text-sm'>デスクトップ</p>
          </div>
        </div>
        <div>

        { loading && <Loading /> }

        {/* mobile */}

        { mobileResults && selectedDevice === 'mobile' &&
        <div>
          <section>
              <AnalysisTable
                name={mobileResults.name}
                url={mobileResults.url}
                score={mobileResults.score}
                date={mobileResults.date}
                getScoreAgain={getScoreAgain}
              />
          </section>

          <section>
          <AnalysisTableAll
            pageList={mobilePageList}
            getScoreAgain={getScoreAgain}
          />
          </section>
        </div>
        }

        {/* { visible &&
          <section>
            <AnalysisTableAll
              pageList={pageList}
              getScoreAgain={getScoreAgain}
            />
          </section>
        } */}

        {/* desktop */}

        { results && selectedDevice === 'desktop' &&
        <div>
          <section>
            <AnalysisTable
              name={results.name}
              url={results.url}
              score={results.score}
              date={results.date}
              getScoreAgain={getScoreAgain}
            />
          </section>

          <section>
          <AnalysisTableAll
            pageList={pageList}
            getScoreAgain={getScoreAgain}
          />
          </section>
        </div>
        }
        </div>
    </section>

  </div>
  )
}

export default page
