'use client'
import { ChangeEvent, useState } from 'react'
import { PSIDataType } from '@/type'
import AnalysisInput from '@/components/Input/AnalysisInput'
import AnalysisButton from '@/components/Button/AnalysisButton'
import AnalysisCheckbox from '@/components/CheckBox/Analysischeckbox'
import AnalysisSelect from '@/components/Select/AnalysisSelect'
import PageToButton from '@/components/Button/PageToButton'
import { getPsiData } from '@/utils/getPsi'
import Modals from '@/components/Modals'

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

  const handlePsiData = async () => {
    await getPsiData(selectedDevice, name, url)
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
      <div className='text-center mb-2'>
        <h2 className='text-2xl font-semibold'></h2>
      </div>

      {isModalOpen && <Modals
        id={id}
        getPsiData={handlePsiData}
        onOpen={openModal}
        onClose={closeModal}
      />}

      <div className='mb-5 flex justify-end'>
        <PageToButton
          label='複数ページ登録'
          pageURL='/list/add/multi-add'
        />
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
            setOpen={setIsModalOpen}
          />
        </div>
      </div>
    </div>
  )
}
