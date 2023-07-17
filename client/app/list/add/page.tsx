'use client'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { PSIDataType } from '@/type'

import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'

import { urlValidate } from '@/lib/urlValidate'
import { postData } from '@/lib/fetchData'
import AnalysisCheckbox from '@/components/CheckBox/AnalysisCheckbox'

interface Props extends PSIDataType {}

const page: NextPage<Props> = (): JSX.Element => {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

  const fetchPsiData = async (url: string, device: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}pageSpeedInsights?url=${urlValidate(url)}&strategy=${device}`, {
      cache: 'no-store'
    })
    return res
  }

  const getPsi = async(id: number) => {
    if (selectedDevice.includes('desktop') && selectedDevice.includes('mobile')) {
      const desktopRes = await fetchPsiData(url, 'desktop')
      const mobileRes = await fetchPsiData(url, 'mobile')

      if (desktopRes.ok) {
        const desktopInfo = await desktopRes.json()
        const { result: desktopResult } = desktopInfo
        const { lighthouseResult } = desktopResult
        const { categories } = lighthouseResult
        const { performance } = categories
        const score = performance.score * 100

        const { audits } = lighthouseResult
        const metrics = {
          lcp: audits['largest-contentful-paint'],
          fid: audits['max-potential-fid'],
          cls: audits['cumulative-layout-shift'],
          fcp: audits['first-contentful-paint'],
          fci: audits['first-cpu-idle'],
          eil: audits['estimated-input-latency'],
          fmp: audits['first-meaningful-paint'],
          tti: audits['interactive'],
          tbt: audits['total-blocking-time'],
          tbf: audits['time-to-first-byte'],
          si: audits['speed-index']
        }

        const psiData = {
          name,
          url,
          score,
          lcp: metrics.lcp.displayValue,
          fid: metrics.fid.displayValue,
          cls: metrics.cls.displayValue,
          fcp: metrics.fcp.displayValue,
          tbt: metrics.tbt.displayValue,
          si: metrics.si.displayValue,
          device: 'desktop'
        }

        console.log(psiData)

        await postData('pageList', psiData)

      }

        if (mobileRes.ok) {
          const mobileInfo = await mobileRes.json()
          const { result: mobileResult } = mobileInfo
          const { lighthouseResult } = mobileResult
          const { categories } = lighthouseResult
          const { performance } = categories
          const score = performance.score * 100

          const { audits } = lighthouseResult
          const metrics = {
            lcp: audits['largest-contentful-paint'],
            fid: audits['max-potential-fid'],
            cls: audits['cumulative-layout-shift'],
            fcp: audits['first-contentful-paint'],
            fci: audits['first-cpu-idle'],
            eil: audits['estimated-input-latency'],
            fmp: audits['first-meaningful-paint'],
            tti: audits['interactive'],
            tbt: audits['total-blocking-time'],
            tbf: audits['time-to-first-byte'],
            si: audits['speed-index']
          }

        const psiData = {
          name,
          url,
          score,
          lcp: metrics.lcp.displayValue,
          fid: metrics.fid.displayValue,
          cls: metrics.cls.displayValue,
          fcp: metrics.fcp.displayValue,
          tbt: metrics.tbt.displayValue,
          si: metrics.si.displayValue,
          device: 'mobile'
        }

        console.log(psiData)

        await postData('pageList', psiData)
      }
    }
  }

  const getChangeUrlName = ({target}: ChangeEvent<HTMLInputElement>) => {
    setName(target.value)
  }

  const getChangeUrl = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const handleDeviceChange = (value: string) => {
    if (selectedDevice.includes(value)) {
      setSelectedDevice(prevState => prevState.filter(device => device !== value))
    } else {
      setSelectedDevice(prevState => [...prevState, value])
    }
  }

  console.log(selectedDevice)

  return (
    <div className='w-full mx-auto'>
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'></h2>
      </div>
      <div className='mb-5 flex justify-end'>
        <button
          className='w-2/12 bg-gray-900 hover:bg-gray-700 text-white
          font-bold py-2 px-4 rounded active:bg-gray-500 active:scale-[1]
          duration-150 focus:shadow-outline ease-in-out hover:scale-[0.95]'>
            <Link href='/add/multi-add'>
              マルチURL登録
            </Link>
        </button>
      </div>
      <div>
        <div className='mb-4'>
          <AnalysisInput
            placeholder='サイト名'
            handleChange={getChangeUrlName}
          />
        </div>
        <div className='mb-4'>
          <AnalysisInput
            placeholder='https://example.com'
            handleChange={getChangeUrl}
          />
        </div>

        <div className='flex justify-spacebetween items-center space-x-4'>
          <div className='w-1/2'>
            <select
              className='bg-gray-900 border border-gray-800 text-gray-900 text-sm
                rounded focus:ring-rounded focus:ring-gray-500 focus:border-gray-500
                block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500'
            >
              <option>PSI自動取得時間指定</option>
              <option>24時間</option>
            </select>
          </div>
        </div>

        <div className='flex items-start justify-spacebetween space-x-8 mb-2'>
          <AnalysisCheckbox device='desktop' checkEvent={handleDeviceChange} />
          <AnalysisCheckbox device='mobile' checkEvent={handleDeviceChange} />
        </div>

        <div className='w-2/12'>
          <AnalysisButton
            id={id}
            label='登録'
            handleScore={getPsi}
          />
        </div>
      </div>
    </div>
  )
}

export default page