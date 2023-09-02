'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PsiInput from '@/components/PsiInput'
import PsiButton from '@/components/PsiButton'
import { useEffect, useState } from 'react'
import { PSIDataType } from '@/type'
import Loading from '@/components/Loading'
import AnalysisTableList from '@/components/PsiTable'
import { SlScreenSmartphone } from 'react-icons/sl'
import { RiComputerLine } from 'react-icons/ri'
import { urlValidate } from '@/utils/validation'
import { postData, patchData, deleteData } from '@/utils/fetchData'
import PsiTable from '@/components/PsiTable'
const queryClient = new QueryClient()

interface Props extends PSIDataType {}

export default function DataRegister() {
  const [id, setId] = useState<number>(0)
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
    setSelectedDevice(device)
  }

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}pageList/`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        const data = await response.json()
        setPageList(prevState => {
          const updatedList = data[0].map((item: any) => ({
            id: item.id,
            name: item.name,
            url: item.url,
            score: item.score,
            date: item.date
          }))
          return [...prevState, ...updatedList]
        })
      } catch (error) {
        console.log(error)
      }
    }

      getData()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full mx-auto'>
        <section className='mb-10'>
          <div className='text-center mb-2'>
            <h2 className='text-2xl font-semibold'></h2>
          </div>
          <div className=''>
            <div className='mb-2'>
              <PsiInput
                placeholder='サイト名'
                handleChange={getChangeUrlName}
              />
            </div>
            <div className='mb-2'>
              <PsiInput
                placeholder='https://example.com'
                handleChange={getChangeUrl}
              />
            </div>
          </div>
          <div>
            <div className='w-2/12'>
              {/* <PsiButton
                label='登録'
                setOpen={setIsModalOpen}
              /> */}
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
          { !loading && selectedDevice === 'mobile' &&
            <PsiTable />
          }
          {/* desktop */}
          { !loading && selectedDevice === 'desktop' &&
            <PsiTable />
          }
          </div>
      </section>

    </div>
  </QueryClientProvider>
  )
}
