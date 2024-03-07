'use client'

import Link from 'next/link'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import debounce from 'lodash.debounce'
import RegistrationCheckbox from '@/components/CheckBox/RegistrationCheckbox'
import PsiSelect from '@/components/PsiSelect'
import Input from '@/components/Input/Input'
import Dialog from '@/components/Dialog/Dialog'
import { ExclamationTriangleIcon, CheckCircleIcon, DocumentChartBarIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid'
import { urlValidate, inputValidate, checkboxValidate, textareaValidate, csvValidate } from '@/utils/validation'
import { ProgressLoading } from '@/components/Loader/Progress'
import { SelectBox, SelectBoxItem } from '@tremor/react'
import { Button, Text } from '@tremor/react'
import ConfirmModal from '@/components/Modals/ConfirmModal'
import { useSession } from 'next-auth/react'
import RegistrationModal from './Modals/RegistrationModal'
import { siteRegistrate } from '@/utils/siteRegistrator'
import { fetchLinkPreview } from '@/utils/getLinkPreview'

interface Props {
  mode: string
  _name: (value: any) => void
  _url: (value: any) => void
  _title: (value: any) => void
  _description: (value: any) => void
  _image: (value: any) => void
}

export default function PsiTabContent({ mode, _name, _url, _title, _description, _image }: Props) {
  const { data: session, status } = useSession()
  const id: number = 0
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [dialogErr, setDialogErr] = useState<boolean>(false)
  const [singleErrorInfo, setSingleErrorInfo] = useState<string[]>([])
  const [multiErrorInfo, setMultiErrorInfo] = useState<string[]>([])
  const [csvErrorInfo, setCsvErrorInfo] = useState<string[]>([])

  const [names, setNames] = useState<string[]>([])
  const [schedule, setSchedule] = useState<string>('0')
  const [selectedDevice, setSelectedDevice] = useState<string[]>([])

  const [isFileExist, setIsfileExist] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])

  const [loading, setLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const [csvFiles, setCsvFiles] = useState<string[]>([])
  const [selectedFileName, setSelectedFileName] = useState<string>('')

  const [isConfirm, setIsConfirm] = useState<boolean>(false)

  // 単体サイト
  const getChangeUrlName = ({target}: ChangeEvent<HTMLInputElement>) => {
    setName(target.value)
    _name(target.value)
  }

  const getChangeUrl = async ({target}: ChangeEvent<HTMLInputElement>) => {
    setUrl(target.value)
    _url(target.value)

    const fetchMeta = await fetchLinkPreview(target.value)
    _title(fetchMeta.title)
    _description(fetchMeta.description)
    _image(fetchMeta.image)
  }

  const getChangeSelect = (value: string) => {
    setSchedule(value)
  }

  // csv
  const handleFileChangeUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      event.preventDefault()
      setIsfileExist(true)
      setIsUploaded(true)
      setSelectedFile(event.target.files[0])

      const formData = new FormData()
      formData.append('csvFile', event.target.files[0])

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}upload/${session?.user?.id}`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          console.log('CSVファイルのアップロードが成功しました。')
          const data = await response.json()
          console.log(data)
          setCsvData(data)
        } else {
          console.error('CSVアップロードエラー')
        }
      } catch (error) {
        console.error('CSVアップロードエラー:', error)
      }
    }
  }

  const handleDownload = async () => {
    if (!selectedFileName) {
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}download/csv/${session?.user?.id}/${selectedFileName}`)

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', selectedFileName)
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
    const csvValidation = csvValidate(isUploaded, isFileExist)
    let newSingleErrorInfo = []
    let newMultiErrorInfo = []
    let newCsvErrorInfo = []

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
    } else if (mode === 'csv') {
      if (csvValidation) {
        newCsvErrorInfo.push(csvValidation)
      }

      if (checkboxValidation) {
        newCsvErrorInfo.push(checkboxValidation)
      }
    }

    if (newSingleErrorInfo.length > 0 || newMultiErrorInfo.length > 0 || newCsvErrorInfo.length > 0) {
      setDialogErr(true)
      setSingleErrorInfo(newSingleErrorInfo)
      setMultiErrorInfo(newMultiErrorInfo)
      setCsvErrorInfo(newCsvErrorInfo)
    } else {
      setDialogErr(false)
      setSingleErrorInfo([])
      setMultiErrorInfo([])
      setCsvErrorInfo([])
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePsiData = async () => {
    setLoading(true)

    if (mode === 'single') {
      await siteRegistrate(selectedDevice, name, url, schedule, Number(session?.user?.id), setProgress)
    } else if (mode === 'multiple') {
      const siteList = names.map((separate) => {
        const [name, url] = separate.split(/\s+/)
        return { name, url }
      })

      for (const site of siteList) {
        if (!site.name || !site.url) {
          continue
        }

        await siteRegistrate(selectedDevice, site.name, site.url, schedule, Number(session?.user?.id), setProgress)
      }
    } else if (mode === 'csv') {
      const csvSiteList = csvData.map(async (data) => {
        console.log(data)
        await siteRegistrate(selectedDevice, data.NAME, data.URL, schedule, Number(session?.user?.id), setProgress)
      })
      await Promise.all(csvSiteList)
    }

    setLoading(false)

    setTimeout(() => {
      setIsConfirm(true)
    }, 1000)
  }

  const handleSiteDataChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    const separatedValue = value.split('\n')
    setNames(separatedValue)
  }

  useEffect(() => {
    const fetchCsvFiles = async () => {
      try {
        //const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}download/csv-list`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}download/csv-list/${session?.user?.id}/`)
        if (response.ok) {
          const data = await response.json()
          setCsvFiles(data)
        } else {
          console.error('Error fetching CSV files:', response.status)
        }
      } catch (error) {
        console.error('Error fetching CSV files:', error)
      }
    }

    fetchCsvFiles()
  }, [])

  return (
    <div>
      { loading &&
        <ProgressLoading progress={progress} />
      }

      {isUploaded && (
        <>
          <Dialog
            className='w-1/2 mx-auto absolute -top-4 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
            title='成功'
            color='green'
            icon={CheckCircleIcon}
            message='ファイルを無事にアップできました.'
          />
        </>
      )}

      {dialogErr && (
        <>
        {mode === 'single' && (
          singleErrorInfo.map((info, index) => (
            <Dialog
              key={index}
              className='w-1/2 mx-auto absolute -top-4 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
              title='エラー'
              color='red'
              icon={ExclamationTriangleIcon}
              message={info}
            />
          ))
        )}

        {mode === 'multiple' && (
          multiErrorInfo.map((info, index) => (
            <Dialog
              key={index}
              className='w-1/2 mx-auto absolute -top-4 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
              title='エラー'
              color='red'
              icon={ExclamationTriangleIcon}
              message={info}
            />
          ))
        )}

        {mode === 'csv' && (
          csvErrorInfo.map((info, index) => (
            <Dialog
              key={index}
              className='w-1/2 mx-auto absolute top-10 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
              title='エラー'
              color='red'
              icon={ExclamationTriangleIcon}
              message={info}
            />
          ))
        )}
        </>
      )}

      <div>
      {mode === 'single' && (
        <div>
          <div className='mb-4'>
            <Input
              placeholder='example'
              handleChange={getChangeUrlName}
            />
          </div>
          <div className='mb-4'>
            <Input
              placeholder='https://example.com'
              handleChange={debounce(getChangeUrl, 5000)}
            />
          </div>
        </div>
      )}
      {mode === 'multiple' && (
        <div>
          <div className='mb-4'>
            <textarea
              placeholder='example http://example.com サイト名とURLの間に半角スペースを入れてください.'
              rows={10}
              onChange={handleSiteDataChange}
              value={names.join('\n')}
              className='w-full p-2 border placeholder:text-xs placeholder:text-gray-400 rounded ring-blue-300 ring-0 focus:ring-2
              focus:ring-blue-200 focus:outline-none border-gray-300 dark:text-gray-950'
            />
          </div>
        </div>
      )}
      {mode === 'csv' && (
        <div>
          <div className='mt-4'>
            <Button
              className='sm:w-[130px] w-1/3 bg-gray-900 hover:bg-gray-700
                py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
                duration-150 focus:shadow-outline ease-in-out'
              color='gray'
              type='button'
            >
              <Link
                className='flex items-center gap-x-1'
                href={{ pathname: '/file/example-csv.csv' }}
              >
                <ArrowDownTrayIcon className='w-4 h-4' />
                <span className='block text-xs'>CSVサンプル</span>
              </Link>
            </Button>
          </div>
          <form className='w-full'>
            <Text className="text-xs font-semibold mt-4 -mb-4 inline-block text-neutral-700 dark:text-neutral-200">
              CSVファイルをアップロードしてください.
            </Text>
            <div className={`flex justify-center relative w-full h-[180px] overflow-hidden mb-4
              before:flex before:items-center before:justify-center before:absolute before:top-[10px]
              before:bottom-[12px] before:left-0 before:right-0 before:border-dashed
              before:border-2 before:rounded-lg  before:text-black before:text-sm
              ${isFileExist ? `before:border-black` : `before:border-gray-400`}
              `}>
                {isFileExist ? (
                  <Text className="flex items-center justify-center top-0 left-0 w-full h-full p-2 text-center text-black text-sm">
                    ファイルをアップしました: {selectedFile?.name}
                  </Text>
                ) : (
                  <Text className="flex items-center justify-center top-0 left-0 w-full h-full p-2 text-center text-gray-400 text-sm">
                    ドロップ&ドラッグ
                  </Text>
                )}
                <input
                  className='absolute top-0 left-0 w-full h-full opacity-0'
                  type='file'
                  name='csvFile'
                  onChange={handleFileChangeUpload}
                  id="formFile"
                />
            </div>
          </form>

          <div className='mb-4 flex gap-6 items-end'>
            <div className='flex w-1/2 gap-2 h-[36px]'>
              <div className="mx-auto space-y-6 w-full">
                <SelectBox value={selectedFileName} onValueChange={setSelectedFileName}>
                {csvFiles.map((file, index) => (
                  <SelectBoxItem
                    key={index}
                    value={file}
                    icon={DocumentChartBarIcon}
                  >
                    {file}
                  </SelectBoxItem>
                ))}
                </SelectBox>
              </div>

              <Button
                className='sm:w-[130px] w-1/3 bg-gray-900 hover:bg-gray-700
                  py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
                  duration-150 focus:shadow-outline ease-in-out'
                color='gray'
                type='button'
                onClick={handleDownload}
              >
                <span className='flex items-center gap-x-1'>
                  <ArrowDownTrayIcon className='w-4 h-4' />
                  <span className='block text-xs'>ダウンロード</span>
                </span>
              </Button>

            </div>
          </div>

        </div>
      )}

      <div className='flex justify-spacebetween items-center space-x-4'>
        <div>
          <PsiSelect
            placeholder='自動取得時間選択'
            handleSelectChange={getChangeSelect}
          />
        </div>
      </div>

        <div className='flex items-start justify-spacebetween space-x-8 mb-2'>
          <RegistrationCheckbox device='desktop' checkEvent={handleDeviceChange} />
          <RegistrationCheckbox device='mobile' checkEvent={handleDeviceChange} />
        </div>

        <div className='w-2/12'>
          <RegistrationModal
            onShow={isModalOpen}
            label={mode === 'csv' ? 'アップロード' : '登録'}
            text={mode === 'csv' ? 'CSVファイルをアップロードしますか？' : 'サイトを登録しますか？'}
            id={id}
            userId={Number(session?.user?.id)}
            userName={session?.user?.name || ''}
            name={mode === 'single' ? name : names}
            url={mode === 'single' ? url : ''}
            siteRegistrate={handlePsiData}
            onOpen={openModal}
            onClose={closeModal}
          />
        </div>

        {isConfirm && <ConfirmModal />}

      </div>
    </div>
  )
}