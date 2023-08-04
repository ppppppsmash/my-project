'use client'
import { ChangeEvent, useState } from 'react'
import { PSIDataType } from '@/type'
import PsiCheckbox from '@/components/Psicheckbox'
import PsiSelect from '@/components/PsiSelect'
import PageToButton from '@/components/Button/PageToButton'
import { getPsiData } from '@/utils/getPsi'
import Modals from '@/components/Modals'
import {
  Card,
  Title,
  Button
} from '@tremor/react'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'

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
    await getPsiData(selectedDevice, name, url, '/list')
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div>
      <Title>ページ登録</Title>

      {isModalOpen && <Modals
        id={id}
        getPsiData={handlePsiData}
        onOpen={openModal}
        onClose={closeModal}
      />}

      <div className='mb-5 flex justify-end'>
        <Button
          className='w-[150px] bg-gray-900 hover:bg-gray-700
          py-2 px-4 rounded active:bg-gray-500
          duration-150 focus:shadow-outline ease-in-out'
          color='gray'
        >
          <a href='/list/add/multi-add'>
            複数ページ登録
          </a>
        </Button>
      </div>

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
      </Card>
    </div>
  )
}
