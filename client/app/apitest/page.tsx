'use client'
import { ChangeEvent, useEffect, useState } from 'react'
import { PSIDataType } from '@/type'
import PsiCheckbox from '@/components/PsiCheckbox'
import PsiSelect from '@/components/PsiSelect'
import { getPsiData } from '@/utils/getPsi'
import Modals from '@/components/Modals'
import {
  Card,
  Title,
  LineChart
} from '@tremor/react'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'
import { getDataAll } from '@/utils/fetchData'
import { formatDate } from '@/utils/formatDate'

interface Props extends PSIDataType {}

const dataFormatter = (number: number) => {
  return `${Intl.NumberFormat("ja-JP").format(number).toString()} s`
}

export default function AddList() {
  const [pageList, setPageList] = useState<PSIDataType[]>([])
  const [id, setId] = useState(0)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

  // const dataFormatter = pageList.map(item => {
  //   const fcpValue = item.fcp?.split(/\s/)[0] // 半角スペースで分割し、最初の要素を取得
  //   return {
  //     ...item,
  //     fcp: fcpValue
  //   }
  // })

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

  const handlePsiData = async () => {
    await getPsiData(selectedDevice, name, url, '/apitest')
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getDataByAll = async () => {
      const data = await getDataAll('api')
      console.log(data)
      const updatedList = data.map((item: any) => ({
        id: item.id,
        device: item.device,
        name: item.name,
        url: item.url,
        score: item.score,
        //date:  formattedDate.replace(/(\d{4})年\s+/, '$1年\n')
        date: formatDate(item.date),
        lcp: Number(item.lcp.replace(/,/g, '').split(/\s/)[0]),
        fid: Number(item.fid.replace(/,/g, '').split(/\s/)[0]) / 1000, // ms -> s
        cls: Number(item.cls.replace(/,/g, '').split(/\s/)[0]),
        fcp: Number(item.fcp.replace(/,/g, '').split(/\s/)[0]),
        tbt: Number(item.tbt.replace(/,/g, '').split(/\s/)[0]),
      }))

      setPageList(updatedList)
      console.log(pageList)
    }

    getDataByAll()
  }, [])

  return (
    <div>
      <Title>グラフ</Title>

      {isModalOpen && <Modals
        id={id}
        getPsiData={handlePsiData}
        onOpen={openModal}
        onClose={closeModal}
      />}

      <Card>
        <div className='mb-4'>
          <PsiInput
            placeholder='site名'
            handleChange={getChangeUrlName}
          />
        </div>
        <div className='mb-4'>
          <PsiInput
            placeholder='https://example.com'
            handleChange={getChangeUrl}
          />
        </div>

        <div className='flex justify-spacebetween items-center space-x-4'>
          <div className='w-1/2'>
            <PsiSelect
              placeholder='PSI自動取得時間指定'
            />
          </div>
        </div>

        <div className='flex items-start justify-spacebetween space-x-8 mb-2'>
          <PsiCheckbox device='desktop' checkEvent={handleDeviceChange} />
          <PsiCheckbox device='mobile' checkEvent={handleDeviceChange} />
        </div>

        <div className='w-2/12'>
          <PsiButton
            id={id}
            label='登録'
            setOpen={setIsModalOpen}
          />
        </div>

        <div className='mt-[60px]'>
          <Title>ライン グラフ</Title>
          <LineChart
            className='whitespace-pre'
            data={pageList}
            index='date'
            categories={['lcp', 'fid', 'fcp', 'tbt']}
            colors={['emerald', 'rose', 'amber', 'cyan']}
            valueFormatter={dataFormatter}
            yAxisWidth={40}
          />
        </div>
      </Card>
    </div>
  )
}
