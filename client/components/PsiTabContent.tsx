'use client'
import { ChangeEvent, useState } from 'react'
import PsiCheckbox from '@/components/PsiCheckbox'
import PsiSelect from '@/components/PsiSelect'
import { getPsiData } from '@/utils/getPsi'
import Modals from '@/components/Modals'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'

interface Props {
  mode: string
}

export default function PsiTabContent({ mode }: Props) {
  const id: number = 0
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const [names, setNames] = useState<string[]>([])
  const [urls, setUrls] = useState<string[]>([])

  const [schedule, setSchedule] = useState('0')

  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

  // 単体サイト
  const getChangeUrlName = ({target}: ChangeEvent<HTMLInputElement>) => {
    setName(target.value)
  }

  const getChangeUrl = ({target}: ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
  }

  const getChangeSelect = (value: string) => {
    setSchedule(value)
  }

  // デバイス選択
  const handleDeviceChange = (value: string) => {
    if (selectedDevice.includes(value)) {
      setSelectedDevice(prevState => prevState.filter(device => device !== value))
    } else {
      setSelectedDevice(prevState => [...prevState, value])
    }
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePsiData = async () => {
    if (mode === 'single') {
      await getPsiData(selectedDevice, name, url, schedule, '/list')
    } else if (mode === 'multiple') {
      const siteList = names.map((line) => {
        const [name, url] = line.split(/\s+/)
        return { name, url }
      })

      for (const site of siteList) {
        if (!site.name || !site.url) {
          continue
        }

        await getPsiData(selectedDevice, site.name, site.url, schedule, '/list')
      }
    }
  }

  const handleSiteDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const lines = value.split('\n')
    setNames(lines)
  }

  return (
    <div>
      {isModalOpen && <Modals
        id={id}
        getPsiData={handlePsiData}
        onOpen={openModal}
        onClose={closeModal}
      />}

      <div>
      {mode === 'single' && (
        <div>
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
        </div>
      )}
      {mode === 'multiple' && (
        <div>
          <div className='mb-4'>
          <textarea
            placeholder='example http://example.com（サイトとURLの間にスペース入り）'
            rows={10}
            onChange={handleSiteDataChange}
            value={names.join('\n')}
            className='w-full p-2 border rounded'
          />
          </div>
        </div>
      )}
      <div className='flex justify-spacebetween items-center space-x-4'>
        <div className='w-1/2'>
          <PsiSelect
            placeholder='自動で取得時間選択'
            handleSelectChange={getChangeSelect}
          />
        </div>
      </div>

        <div className='flex items-start justify-spacebetween space-x-8 mb-2'>
          <PsiCheckbox device='desktop' checkEvent={handleDeviceChange} />
          <PsiCheckbox device='mobile' checkEvent={handleDeviceChange} />
        </div>

        <div className='w-2/12'>
          <PsiButton
            label='登録'
            setOpen={setIsModalOpen}
          />
        </div>

      </div>
    </div>
  )
}