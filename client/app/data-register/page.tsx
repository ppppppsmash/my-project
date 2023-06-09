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
import { urlValidate } from '@/lib/urlValidate'


interface Props extends ApiResultType {}

const page: NextPage<Props> = (props): JSX.Element => {
  const [name, setName] = useState('')
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
    setName(target.value)
  }

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const handleDeviceSelection = (device: 'mobile' | 'desktop') => {
    setSelectedDevice(device);
  };

  const date = new Date().toLocaleString()

  const fetchPsiData = async (url: string, device: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${urlValidate(url)}&strategy=${device}`, {
      cache: 'no-store'
    })
    return res
  }

  const getPsiInfo = async() => {
    setLoading(true)
    const res = await fetchPsiData(url, selectedDevice)

    if (res.ok) {
      const info = await res.json()
      const { result } = info
      const { lighthouseResult } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits } = lighthouseResult
      const metrics = {
        lcp: audits['largest-contentful-paint'],
        fid: audits['first-input-delay'],
        cls: audits['cumulative-layout-shift'],
        fcp: audits['first-contentful-paint'],
        tbt: audits['total-blocking-time'],
        si: audits['speed-index'],
        fci: audits['first-cpu-idle'],
        eil: audits['estimated-input-latency'],
        fmp: audits['first-meaningful-paint'],
        tti: audits['interactive']
      }

      const psiData = {
        name,
        url,
        date,
        score,
        fcp: metrics.fcp.displayValue,
        lcp: metrics.lcp.numericValue
      }

      selectedDevice === 'desktop'
        ? setResults(prevState => ({ ...prevState, ...psiData }))
        : setMobileResults(prevState => ({ ...prevState, ...psiData }))
      selectedDevice === 'desktop'
        ? setPageList(prevState => [...prevState, psiData])
        : setMobilePageList(prevState => [...prevState, psiData])

        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}pageList`, {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, url, score})
        })
        const data = await response.json()

       setVisible(true)
       setLoading(false)
    }
  }

  const getScoreAgain = async (url: string) => {
    setLoading(true)

    const res = await fetchPsiData(url, selectedDevice)

    if (res.ok) {
      const data = await res.json()
      const { result } = data
      const { lighthouseResult } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits } = lighthouseResult
      const metrics = {
        lcp: audits['largest-contentful-paint'],
        fid: audits['first-input-delay'],
        cls: audits['cumulative-layout-shift'],
        fcp: audits['first-contentful-paint'],
        tbt: audits['total-blocking-time'],
        si: audits['speed-index'],
        fci: audits['first-cpu-idle'],
        eil: audits['estimated-input-latency'],
        fmp: audits['first-meaningful-paint'],
        tti: audits['interactive']
      }

      const psiData = {
        name,
        url,
        date,
        score,
        fcp: metrics.fcp.displayValue,
        lcp: metrics.lcp.numericValue
      }

      selectedDevice === 'desktop'
        ? setResults(prevState => ({ ...prevState, url, date, score }))
        : setMobileResults(prevState => ({ ...prevState, url, date, score }))

      selectedDevice === 'desktop'
        ? setPageList(prevState =>
          prevState.map(item => {
            if (item.url === url) {
              return { ...item, score: psiData.score, date }
            }
            return item
          })
        )
        : setMobilePageList(prevState =>
          prevState.map(item => {
            if (item.url === url) {
              console.log(item)
              return { ...item, score: psiData.score, date }
            }
            return item
          })
        )

      setVisible(true)
      setLoading(false)
    }
  }

  const deleteItem = async (index: number) => {
    setPageList((prevState) => {
      const updatedList = [...prevState];
      updatedList.splice(index, 1);
      return updatedList;
    });
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
        {/* loading */}
        { loading && <Loading /> }
        {/* mobile */}
        { mobileResults && selectedDevice === 'mobile' &&
          <AnalysisTableAll
            pageList={mobilePageList}
            getScoreAgain={getScoreAgain}
            deleteItem={deleteItem}
          />
        }
        {/* desktop */}
        { results && selectedDevice === 'desktop' &&
          <AnalysisTableAll
            pageList={pageList}
            getScoreAgain={getScoreAgain}
            deleteItem={deleteItem}
          />
        }
        </div>
    </section>

  </div>
  )
}

export default page
