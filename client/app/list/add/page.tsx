'use client'
import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { PSIDataType } from '@/type'

import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'

import { urlValidate } from '@/utils/urlValidate'
import { postData } from '@/utils/fetchData'
import AnalysisCheckbox from '@/components/CheckBox/Analysischeckbox'
import AnalysisSelect from '@/components/Select/AnalysisSelect'

interface Props extends PSIDataType {}

export default function AddList() {
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

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

  const fetchPsiData = async (url: string, device: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}psi?url=${urlValidate(url)}&strategy=${device}`, {
      cache: 'no-store'
    })
    return res
  }

  const getPsi = async () => {
    const psiDataArray = []

    for (const device of selectedDevice) {
      const res = await fetchPsiData(url, device)

      if (res.ok) {
        const result = await res.json()
        const { lighthouseResult, loadingExperience } = result
        const { categories } = lighthouseResult
        const { performance } = categories
        const score = performance.score * 100

        const { audits: lighthouseResultAudits } = lighthouseResult
        const lighthouseResultMetrics = {
          lcp: lighthouseResultAudits['largest-contentful-paint'],
          fid: lighthouseResultAudits['max-potential-fid'],// FIRST_INPUT_DELAY_MS
          cls: lighthouseResultAudits['cumulative-layout-shift'],
          fcp: lighthouseResultAudits['first-contentful-paint'],
          fci: lighthouseResultAudits['first-cpu-idle'],
          eil: lighthouseResultAudits['estimated-input-latency'],
          fmp: lighthouseResultAudits['first-meaningful-paint'],
          tti: lighthouseResultAudits['interactive'],
          tbt: lighthouseResultAudits['total-blocking-time'],
          tbf: lighthouseResultAudits['time-to-first-byte'],
          si: lighthouseResultAudits['speed-index']
        }

        const { metrics: loadingExperienceAudits } = loadingExperience
        const loadingExperienceMetrics = {
          CUMULATIVE_LAYOUT_SHIFT_SCORE: loadingExperienceAudits['CUMULATIVE_LAYOUT_SHIFT_SCORE']
        }

        const psiData = {
          name,
          url,
          score,
          lcp: lighthouseResultMetrics.lcp.displayValue,
          fid: lighthouseResultMetrics.fid.displayValue,
          cls: lighthouseResultMetrics.cls.displayValue,
          fcp: lighthouseResultMetrics.fcp.displayValue,
          tbt: lighthouseResultMetrics.tbt.displayValue,
          si: lighthouseResultMetrics.si.displayValue,
          // test: loadingExperienceMetrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.category,
          device
        }
        console.log(psiData)
        psiDataArray.push(psiData)
      //  console.log(psiDataArray)
        console.log(result)
      }
    }
    psiDataArray.map(async (psiData) => {
      await postData('api', psiData)
    })
  }

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
            <Link href={{ pathname: '/add/multi-add' }}>
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
            <AnalysisSelect
              placeholder='PSI自動取得時間指定'
            />
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
            getScore={getPsi}
          />
        </div>
      </div>
    </div>
  )
}
