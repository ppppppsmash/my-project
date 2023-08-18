'use client'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'
import { useState } from 'react'
import { urlValidate } from '@/utils/validation'
import { SlScreenSmartphone } from 'react-icons/sl'
import { RiComputerLine } from 'react-icons/ri'
import Loading from '@/components/Loading'

interface PSIDataType {
  id: number;
  device: string;
  name?: string;
  url: string;
  date?: string;
  score: number;
  label?: string;
  lcp?: string;
  fid?: string;
  cls?: string;
  fcp?: string;
  tbt?: string;
  si?: string;
}

export default function Analysis() {
// const Analysis: NextPage<PSIDataType> = () => {
  const [id, setId] = useState<number>(0)
  const [url, setUrl] = useState('')

  const [results, setResults] = useState<PSIDataType>()
  const [mobileResults, setMobileResults] = useState<PSIDataType>()

  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'desktop'>('mobile')

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const [pageList, setPageList] = useState<PSIDataType[]>([])
  const [mobilePageList, setMobilePageList] = useState<PSIDataType[]>([])

  const date = new Date().toLocaleString()

  const getChangeUrl = ({target}: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const fetchPsiData = async (url: string, device: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}PageSpeedInsights?url=${urlValidate(url)}&strategy=${device}`, {
      cache: 'no-store'
    })
    return res
  }

  const getPsiInfo = async() => {
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

      console.log(audits)

      const psiData = {
        id,
        url,
        date,
        score,
        device: selectedDevice,
        lcp: metrics.lcp.numericValue,
        // fid: metrics.fid.displayValue,
        // cls: metrics.cls.displayValue,
        // fcp: metrics.fcp.displayValue,
        // tbt: metrics.tbt.displayValue,
        // si: metrics.si.displayValue
      }

      console.log(psiData)

      selectedDevice === 'desktop'
        ? setResults(prevState => ({ ...prevState, ...psiData }))
        : setMobileResults(prevState => ({ ...prevState, ...psiData }))
      selectedDevice === 'desktop'
        ? setPageList(prevState => [...prevState, psiData])
        : setMobilePageList(prevState => [...prevState, psiData])

       setVisible(true)
       setLoading(false)
    }
  }

  const handleDeviceSelection = (device: 'mobile' | 'desktop') => {
    setSelectedDevice(device)
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='w-full mx-auto'>
      <section className='mb-10'>
        <div className='text-center mb-2'>
          <h2 className='text-2xl font-semibold'>計測対象URL</h2>
        </div>
        <div className='flex items-center justify-center space-x-3'>
          <div className='w-full'>
            <PsiInput
              placeholder='https://example.com'
              handleChange={getChangeUrl}
            />
          </div>
          <div className='w-2/12'>
          <PsiButton
            label='分析'
            setOpen={setIsModalOpen}
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
          { !loading && mobileResults && selectedDevice === 'mobile' &&
            mobilePageList.map((mobilePage) => (
              <div key={mobilePage.id}>
                <ul>
                  <li>url:  {mobilePage.url}</li>
                  <li>score: {mobilePage.score}</li>
                  <li>date:  {mobilePage.date}</li>
                  <li>lcp: {mobilePage.lcp}</li>
                  <li>fid: {mobilePage.fid}</li>
                  <li>cls: {mobilePage.cls}</li>
                  <li>fcp: {mobilePage.fcp}</li>
                  <li>tbt: {mobilePage.tbt}</li>
                  <li>si: {mobilePage.si}</li>
                  <li>device: {mobilePage.device}</li>
                </ul>
              </div>
            ))
          }
          {/* desktop */}
          { !loading && results && selectedDevice === 'desktop' &&
            pageList.map((page) => (
              <div key={page.id}>
                <ul>
                  <li>url:  {page.url}</li>
                  <li>score: {page.score}</li>
                  <li>date:  {page.date}</li>
                  <li>lcp: {page.lcp}</li>
                  <li>fid: {page.fid}</li>
                  <li>cls: {page.cls}</li>
                  <li>fcp: {page.fcp}</li>
                  <li>tbt: {page.tbt}</li>
                  <li>si: {page.si}</li>
                  <li>device: {page.device}</li>
                </ul>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  )
}
