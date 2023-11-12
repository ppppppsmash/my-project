'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState, useEffect, ChangeEvent } from 'react'
import { PSIDataType, SortType } from '@/type'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  TextInput,
  MultiSelectBox,
  MultiSelectBoxItem,
  Badge,
  BadgeDelta
} from '@tremor/react'
import {
  XMarkIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  EyeIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline'
import PsiPopup from '@/components/PsiPopup'
import PsiSelect from '@/components/PsiSelect'
import { deleteData, getData, getDataAll, patchData } from '@/utils/fetchData'
import { getPsiData, getPsiDataAgain } from '@/utils/getPsi'
import { formatDate } from '@/utils/formatDate'
import { FiLoader } from 'react-icons/fi'
import { fetchLinkPreview } from '@/utils/getLinkPreview'
import Image from 'next/image'
import { HoverCard } from '@/components/HoverCard'
import PsiSiteHoverCard from '@/components/PsiSiteHoverCard'
import ClockLoader from 'react-spinners/ClockLoader'
import MoonLoader from 'react-spinners/MoonLoader'
import { useSession } from 'next-auth/react'

interface NewPSIDataType extends PSIDataType {
  score?: string
}

export default function PsiTable() {
  const { data: session, status } = useSession()
  const [selectedNames, setSelectedNames] = useState<string[]>([])
  const [pageList, setPageList] = useState<NewPSIDataType[]>([])
  const [editName, setEditName] = useState<string[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [schedule, setSchedule] = useState('0')
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const LIMIT_ROWS = 10

  const isSiteSelected = (siteList: NewPSIDataType) => {
    if (selectedNames.length === 0) return true
    return selectedNames.includes(siteList.name)
  }

  // スコア再取得
  const handleClick = async (name: string, url: string, index: number, id: number, device: string) => {
    setLoadingVisible(true)
    setSpinningItems((prevState: any) => {
      if (prevState.includes(index)) {
        return prevState.filter((item: number) => item !== index)
      } else {
        return [...prevState, index]
      }
    })

    await getPsiDataAgain(name, url, index, id, device)
    setTimeout(() => {
      setSpinningItems((prevSpinningItems) => prevSpinningItems.filter((item) => item !== index))
    }, 1000)
   }

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnName)
      setSortDirection('asc')
    }
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = target.value
    setEditName((prevState) => {
      const updatedEditName = [...prevState]
      updatedEditName[index] = value
      return updatedEditName
    })
  }

  const handlePageChange = (tablePage: number) => {
    setCurrentTablePage(tablePage)
  }

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setIsEdited(false)
  }

  const handleNameChange = async (index: number, id: number) => {
    const siteList = await getData('psi_site_list', id)
    const siteMetrics = siteList.siteMetrics
    const updatedSiteMetric = siteMetrics.map((siteMetric: any) => {
      return {...siteMetric, name: editName[index]}
    })

    await patchData('psi_site_list', id, {name: editName[index], siteMetrics: updatedSiteMetric})

    setEditIndex(null)
    setIsEdited(true)
  }

  const getChangeSelect = (value: string) => {
    setSchedule(value)
  }

  const handleScheduleChange = async (id: number) => {
    await patchData('psi_site_list', id, { schedule })
    setEditIndex(null)
    setIsEdited(true)
  }

  const queryClient = useQueryClient()

  const getDataByAll = async () => {
    const data = await getDataAll('psi_site_list', Number(session?.user?.id))
    return data
  }

  const { data: result, isLoading } = useQuery<NewPSIDataType[]>({
    queryKey: ['result'],
    queryFn: getDataByAll,
    refetchInterval: 10000
  })

  const deleteItem = async (index: number, id: number) => {
    await deleteData('psi_site_list', id)

    const newResult = result?.filter(item => item.id !== id)
    queryClient.setQueryData(['result'], newResult)
  }

  const sortedData = result ? [...result] : []

  if (sortColumn) {
    sortedData.sort((a, b) => {
      const aValue = sortColumn === 'score' ? String(a.siteMetrics[0]?.score) : a[sortColumn as keyof SortType]
      const bValue = sortColumn === 'score' ? String(b.siteMetrics[0]?.score) : b[sortColumn as keyof SortType]

      if (aValue === undefined || bValue === undefined) {
        return 0
      }

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }

  if(isLoading) return (<h1 className='flex items-center justify-center my-4'><MoonLoader size={22} /></h1>)
  if (!result) return <h1 className='text-md text-center'>データがありません.</h1>

  return (
    <div className={`dark:bg-gray-950`}>
      <MultiSelectBox
        onValueChange={setSelectedNames}
        placeholder="検索..."
        className="max-w-xs mt-8 dark:bg-gray-950"
      >
        {result.map((item) => (
          <MultiSelectBoxItem
            key={item?.id}
            value={(item?.name).toString()}
            text={item?.name}
            className='dark:bg-gray-950 dark:text-white'
          >
            {item?.name}
          </MultiSelectBoxItem>
        ))}
      </MultiSelectBox>

      <Table className='mt-2 border-gray-750 border-[1px] rounded-lg overflow-visible overflow-x-scroll'>
        <TableHead>
          <TableRow className='border-b-[1px]  border-gray-750'>
            <TableHeaderCell
              className='dark:text-white cursor-pointer'
              onClick={() => handleSort('name')}
            >
              <span className='flex group gap-x-2 items-center font-light'>
                Site
                {sortDirection === 'asc' ? (
                  <ArrowSmallUpIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                ) : (
                  <ArrowSmallDownIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                )}
                {/* <ChevronUpDownIcon className='w-4 h-4' /> */}
              </span>
            </TableHeaderCell>
            <TableHeaderCell
              className='dark:text-white font-light'
            >
              URL
            </TableHeaderCell>
            <TableHeaderCell
              className='dark:text-white cursor-pointer'
              onClick={() => handleSort('score')}
            >
              <span className='flex group gap-x-2 items-center font-light'>
                PSI Score
                {sortDirection === 'asc' ? (
                  <ArrowSmallUpIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                ) : (
                  <ArrowSmallDownIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                )}
              </span>
            </TableHeaderCell>
            <TableHeaderCell
              className='dark:text-white cursor-pointer'
              onClick={() => handleSort('updatedAt')}
            >
              <span className='flex group gap-x-2 items-center font-light'>
                Date
                {sortDirection === 'asc' ? (
                  <ArrowSmallUpIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                ) : (
                  <ArrowSmallDownIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                )}
              </span>
            </TableHeaderCell>
            <TableHeaderCell
              className='dark:text-white cursor-pointer'
              onClick={() => handleSort('schedule')}
            >
              <span className='flex group gap-x-2 items-center font-light'>
                Schedule
                {sortDirection === 'asc' ? (
                  <ArrowSmallUpIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                ) : (
                  <ArrowSmallDownIcon className='w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out' />
                )}
              </span>
            </TableHeaderCell>
            <TableHeaderCell className='dark:text-white font-light'>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className='dark:text-white'>
          {sortedData?.filter((item) => isSiteSelected(item)).map((item, index) => (
            <TableRow
              className='hover:bg-gray-50 dark:hover:bg-gray-700'
              key={item.id}
            >
              <TableCell className='dark:text-white'>
                <p className='flex items-center space-x-2'>
              {
                item.device === 'mobile' ? (
                  <DevicePhoneMobileIcon className='w-5 h-5' />
                ) : (
                  <ComputerDesktopIcon className='w-5 h-5' />
                )
              }
              {editIndex === index ? (
                <p className='flex space-x-2 items-center'>
                  <TextInput
                    className='w-10'
                    value={editName[index] || item.name}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <XMarkIcon
                    className='w-5 h-5 cursor-pointer'
                    onClick={(e)=>{
                      e.stopPropagation()
                      setEditIndex(null)
                    }}
                  />
                  <CheckIcon
                    className='w-5 h-5 cursor-pointer'
                    onClick={()=>handleNameChange(index, item.id)}
                  />
                </p> ) : (
                  <PsiSiteHoverCard>
                    <Link
                      className='underline'
                      href={`/list/${item.id}`}>
                      {editName[index] || item.name}
                    </Link>
                  </PsiSiteHoverCard>
                )
              }
              </p>
              </TableCell>
              <TableCell>
                <Text className='underline decoration-dotted dark:text-white'>
                  <HoverCard url={item.url}>
                    <div className='flex relative gap-x-1 items-center group'>
                      <EyeIcon className='absolute -left-5 w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out' />
                      <Link href={{pathname: item.url}} target='_blank'>
                        {item.url}
                      </Link>
                    </div>
                  </HoverCard>
                </Text>
              </TableCell>
              <TableCell>
                {spinningItems.includes(index) ? (
                  <ClockLoader size='15' />
                ) : (
                  <div className='flex items-center gap-x-2'>
                  <Text className='dark:text-white'>{item.siteMetrics[0].score}</Text>
                  {item.siteMetrics[1] && (
                    <>
                      {item.siteMetrics[0].score > item.siteMetrics[1].score ? (
                        <BadgeDelta deltaType="increase">
                          {item.siteMetrics[0].score - item.siteMetrics[1].score}
                        </BadgeDelta>
                      ) : item.siteMetrics[0].score < item.siteMetrics[1].score ? (
                        <BadgeDelta deltaType="decrease">
                          {item.siteMetrics[1].score - item.siteMetrics[0].score}
                        </BadgeDelta>
                      ) : (
                        <BadgeDelta deltaType="unchanged">
                          0
                        </BadgeDelta>
                      )}
                    </>
                  )}
                  </div>
                )}
              </TableCell>
              <TableCell>
              <Text className='dark:text-white'>{formatDate(item.siteMetrics[0].updatedAt) || formatDate(item.createdAt)}</Text>
              </TableCell>
              <TableCell>
              {editIndex === index ? (
                <p className='w-full flex space-x-2 items-center'>
                  <PsiSelect
                    placeholder='再取得時間を再設定してください'
                    handleSelectChange={getChangeSelect}
                  />
                  <XMarkIcon
                    className='w-5 h-5 cursor-pointer'
                    onClick={(e)=>{
                      e.stopPropagation()
                      setEditIndex(null)
                    }}
                  />
                  <CheckIcon
                    className='w-5 h-5 cursor-pointer'
                    onClick={()=>handleScheduleChange(item.id)}
                  />
                </p>
                ) : (
                  item.schedule !== '0' && item.schedule !== 'week' ? (
                    <Text className='dark:text-white'>{item.schedule} 時間</Text>
                  ) : item.schedule === 'week' ? (
                    <Text className='dark:text-white'>1 週間</Text>
                  ) : (
                    <Text className='dark:text-white'>なし</Text>
                  )
                )
              }
              </TableCell>
              <TableCell>
                <PsiPopup
                  className={index === sortedData.length - 1 || index === sortedData.length -2 ? 'bottom-8 -left-6' : 'top-4 -left-6'}
                  behaviorEdit={() => handleEdit(index)}
                  behaviorScoreAgain={() => handleClick(item.name, item.url, index, item.id, item.device)}
                  behaviorDelete={() => deleteItem(index, item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
