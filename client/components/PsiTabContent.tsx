'use client'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useState } from 'react'
import PsiCheckbox from '@/components/PsiCheckbox'
import PsiSelect from '@/components/PsiSelect'
import { getPsiData } from '@/utils/getPsi'
import Modals from '@/components/Modals'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'
import PsiDialog from '@/components/PsiDialog'
import { ExclamationTriangleIcon, CheckCircleIcon, DocumentChartBarIcon } from "@heroicons/react/24/solid"
import { checkboxValidate, inputValidate, textareaValidate } from '@/utils/validation'
import Loading from '@/components/Loading'
import { SelectBox, SelectBoxItem } from '@tremor/react'
import { Button, Text } from '@tremor/react'

interface Props {
  mode: string
}

export default function PsiTabContent({ mode }: Props) {
  const id: number = 0
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [dialogErr, setDialogErr] = useState<boolean>(false)
  const [singleErrorInfo, setSingleErrorInfo] = useState<string[]>([])
  const [multiErrorInfo, setMultiErrorInfo] = useState<string[]>([])

  const [names, setNames] = useState<string[]>([])
  const [schedule, setSchedule] = useState<string>('0')
  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])

  const [loading, setLoading] = useState<boolean>(false)

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

  // csv
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFile) {
      return;
    }

    const formData = new FormData()
    formData.append('csvFile', selectedFile)

    console.log(selectedFile)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}upload/`, {
        method: 'POST',
        body: formData,
      })

      console.log(response)

      if (response.ok) {
        console.log('CSVファイルのアップロードが成功しました。')
        const data = await response.json()
        console.log(data)
        setCsvData(data)
      } else {
        console.error('CSVファイルのアップロード中にエラーが発生しました。')
      }
    } catch (error) {
      console.error('CSVファイルのアップロード中にエラーが発生しました。', error)
    }
  }

  const handleDownload = async() => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}download/csv`)
      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'test.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('CSVダウンロードエラー:', error)
    }
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
    const checkboxValidation = checkboxValidate(selectedDevice.join(','))
    const inputValidation = inputValidate(name)
    const textareaValidation = textareaValidate(names)
    let newSingleErrorInfo = []
    let newMultiErrorInfo = []

    if (mode === 'single') {
      if (checkboxValidation) {
        newSingleErrorInfo.push(checkboxValidation)
      }

      if (inputValidation) {
        newSingleErrorInfo.push(inputValidation)
      }
    } else if (mode === 'multiple') {
      if (checkboxValidation) {
        newMultiErrorInfo.push(checkboxValidation)
      }

      if(textareaValidation) {
        newMultiErrorInfo.push(textareaValidation)
      }
    }

    if (newSingleErrorInfo.length > 0 || newMultiErrorInfo.length > 0) {
      setDialogErr(true)
      setSingleErrorInfo(newSingleErrorInfo)
      setMultiErrorInfo(newMultiErrorInfo)
    } else {
      setDialogErr(false)
      setSingleErrorInfo([])
      setMultiErrorInfo([])
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePsiData = async () => {
    setLoading(true)

    if (mode === 'single') {
      await getPsiData(selectedDevice, name, url, schedule, '/list')
    } else if (mode === 'multiple') {
      const siteList = names.map((separate) => {
        const [name, url] = separate.split(/\s+/)
        return { name, url }
      })

      for (const site of siteList) {
        if (!site.name || !site.url) {
          continue
        }

        await getPsiData(selectedDevice, site.name, site.url, schedule, '/list')
      }
    } else if (mode === 'csv') {
      const csvSiteList = csvData.map(async (data) => {
        console.log(data)
        await getPsiData(selectedDevice, data.NAME, data.URL, schedule, '/list')
      })
      await Promise.all(csvSiteList)
    }

    setLoading(false)
  }

  const handleSiteDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const separatedValue = value.split('\n')
    setNames(separatedValue)
  }

  return (
    <div>
      { loading &&
        <Loading />
      }

      {dialogErr && (
        mode === 'single' ? (
          singleErrorInfo.map((info, index) => (
          <PsiDialog
            key={index}
            className='h-12 my-4'
            title={info}
            color='rose'
            icon={ExclamationTriangleIcon}
          />
          ))
        ) : (
          multiErrorInfo.map((info, index) => (
            <PsiDialog
              key={index}
              className='h-12 my-4'
              title={info}
              color='rose'
              icon={ExclamationTriangleIcon}
            />
          ))
        )
      )}

      {isModalOpen && <Modals
        id={id}
        name={mode === 'single' ? name : names}
        url={mode === 'single' ? url : ''}
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
      {mode === 'csv' && (
        <div>

          <div className='mb-4 flex gap-6 justify-end'>
            <div className='flex w-1/2 gap-2 h-[36px]'>
              <div className="mx-auto space-y-6 w-full">
                <SelectBox>
                  <SelectBoxItem value="1" icon={DocumentChartBarIcon}>
                    テスト
                  </SelectBoxItem>
                </SelectBox>
              </div>

              <Button
                className='w-[120px] bg-gray-900 hover:bg-gray-700
                py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
                duration-150 focus:shadow-outline ease-in-out'
                color='gray'
                type='button'
                onClick={handleDownload}
              >
                ダウンロード
              </Button>

            </div>

            <form onSubmit={handleSubmit}>
              <Text className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                CSVファイルをアップロードしてください.
              </Text>
              <div className='flex gap-2'>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type='file'
                  name='csvFile'
                  onChange={handleFileChange}
                  id="formFile" />
                <Button
                  className='w-[120px] bg-gray-900 hover:bg-gray-700
                  py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
                  duration-150 focus:shadow-outline ease-in-out'
                  color='gray'
                  type='submit'
                >
                  アップロード
                </Button>
              </div>
            </form>
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
            setOpen={openModal}
          />
        </div>

      </div>
    </div>
  )
}