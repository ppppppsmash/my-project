'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState, ChangeEvent } from 'react'
import { PSIDataType, SortType } from '@/type'
import {
  Flex,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Bold,
  TextInput,
  MultiSelectBox,
  MultiSelectBoxItem,
  BadgeDelta,
} from '@tremor/react'
import {
  XMarkIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
  EyeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import TablePopup from '@/components/PopOver/TablePopup'
import PsiSelect from '@/components/PsiSelect'
import { deleteData, getData, getDataAll, postData, patchData, addCronJob } from '@/utils/fetchData'
import { getPsiDataAgain } from '@/utils/getPsi'
import { formatDate } from '@/utils/formatDate'
import { HoverCard } from '@/components/HoverCard/HoverCard'
import DetailHoverCard from '@/components/HoverCard/DetailHoverCard'
import ClockLoader from 'react-spinners/ClockLoader'
import MoonLoader from 'react-spinners/MoonLoader'
import { useSession } from 'next-auth/react'
import BulkButton from '@/components/Button/BulkButton'
import Dialog from '@/components/Dialog/Dialog'
import CursorArea from '@/components/LayoutComponents/CursorArea'

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
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [isBulk, setIsBulk] = useState<boolean>(false)

  const isSiteSelected = (siteList: NewPSIDataType) => {
    if (selectedNames.length === 0) return true
    return selectedNames.includes(siteList.name)
  }

  // スコア再取得
  const handleClick = async (name: string, url: string, index: number, id: number, device: string) => {
    setSpinningItems((prevState: any) => {
      if (prevState.includes(index)) {
        return prevState.filter((item: number) => item !== index)
      } else {
        return [...prevState, index]
      }
    })

    const historyAction = {
      action: 'スコアを取得した.',
      user_id: Number(session?.user?.id),
      site_name: name,
      site_url: url,
      device
    }

    await getPsiDataAgain(name, url, index, id, device, Number(session?.user?.id), session?.user?.name || '')
    await postData('user_history', historyAction)

    setTimeout(() => {
      setSpinningItems((prevSpinningItems) => prevSpinningItems.filter((item) => item !== index))
    }, 2000)
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

    const historyAction = {
      action: 'サイト名を変更した.',
      user_id: Number(session?.user?.id),
      site_name: editName[index],
      site_url: siteList.url,
      device: siteList.device
    }

    await patchData('psi_site_list', id, {name: editName[index], siteMetrics: updatedSiteMetric})
    await postData('user_history', historyAction)

    setEditIndex(null)
    setIsEdited(true)
  }

  const getChangeSelect = (value: string) => {
    setSchedule(value)
  }

  const handleScheduleChange = async (id: number) => {
    const siteList = await getData('psi_site_list', id)
    await patchData('psi_site_list', id, { schedule })

    const historyAction = {
      action: 'スケジュール(cron job)を設定した.',
      user_id: Number(session?.user?.id),
      site_name: siteList.name,
      site_url: siteList.url,
      device: siteList.device
    }

    await postData('user_history', historyAction)
    await addCronJob('add-cronjob')

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

  const deleteItem = async (index: number, id: number, name: string, url: string, device: string) => {
    const historyAction = {
      action: '削除した.',
      user_id: Number(session?.user?.id),
      site_name: name,
      site_url: url,
      device
    }
    await deleteData('psi_site_list', id)
    await postData('user_history', historyAction)
    await addCronJob('add-cronjob')

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

  const handleBulkUpdate = async () => {
    const selectedItems = result?.filter((item) => {
      return item
    })

    setIsBulk(true)
    setTimeout(() => {
      setIsBulk(false)
    }, 6000)

    // 各アイテムに対してPSIスコアを再取得
    if(selectedItems) {
      for (const selectedItem of selectedItems) {
        const { name, url, id, device } = selectedItem;
        const index = result?.findIndex(item => item.id === id)

        setSpinningItems((item: any) => {
          if (item.includes(index)) {
            return item.filter((x: number) => x !== index)
          } else {
            return [...item, index]
          }
        })

        const historyAction = {
          action: `スコアを一括取得した.`,
          user_id: Number(session?.user?.id)
        }

        await getPsiDataAgain(name, url, index || 0, id, device, Number(session?.user?.id), session?.user?.name || '')
        await postData('user_history', historyAction)

        setTimeout(() => {
          setSpinningItems((prevSpinningItems) => prevSpinningItems.filter((item) => item !== index))
        }, 2000)
      }
    }
  }

  if(isLoading) return (<h1 className='flex items-center justify-center my-4'><MoonLoader size={22} /></h1>)
  if (!result) return <h1 className='text-md text-center'>データがありません.</h1>
  return (
    <div>
      {isBulk &&
        <Dialog
          className='w-10/12 md:w-1/2 mx-auto absolute top-10 -translate-x-1/2 left-1/2 opacity-0 animate-slide-in-sec'
          title='成功'
          color='green'
          icon={CheckCircleIcon}
          message='PSIスコアを一括取得中！'
        />
      }
      <Flex className='items-end'>
        <CursorArea>
          <div
            className='max-w-xs mt-8 z-50'
            data-cursor='block'
          >
            <MultiSelectBox
              onValueChange={setSelectedNames}
              placeholder="検索..."
              className="dark:bg-gray-950"
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
          </div>
        </CursorArea>
        <BulkButton
          label="Let's Get !"
          clickEvent={handleBulkUpdate}
        />
      </Flex>

      <Table className='mt-2 border-gray-750 border-[1px] rounded-lg overflow-x-scroll lg:overflow-visible'>
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
                  <DevicePhoneMobileIcon className='w-5 h-5 -mr-7' />
                ) : (
                  <ComputerDesktopIcon className='w-5 h-5 -mr-7' />
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
                  <DetailHoverCard>
                    <CursorArea>
                      <Link
                        className='underline pl-7 pr-3 py-1'
                        href={`/list/${item.id}`}
                        data-cursor='block'
                      >
                        {editName[index] || item.name}
                      </Link>
                    </CursorArea>
                  </DetailHoverCard>
                )
              }
              </p>
              </TableCell>
              <TableCell>
                <Text className='underline decoration-dotted dark:text-white'>
                  <HoverCard
                    id={item.id}
                    url={item.url}
                    name={item.name}
                    device={item.device}
                  >
                    <div className='flex relative gap-x-1 items-center group'>
                      <EyeIcon className='absolute -left-1 w-4 h-4 opacity-0
                        group-hover:opacity-100 transition duration-500 ease-in-out'
                      />
                      <CursorArea>
                        <Link
                          className='px-4'
                          href={{pathname: item.url}}
                          target='_blank'
                          data-cursor='block'
                        >
                          {item.url}
                        </Link>
                      </CursorArea>
                    </div>
                  </HoverCard>
                </Text>
              </TableCell>
              <TableCell>
                {spinningItems.includes(index) ? (
                  <ClockLoader size={20} color='#36d7b7' />
                ) : (
                  <div className='flex items-center gap-x-2'>
                    <Text className='dark:text-white'>{ item.siteMetrics[0]?.score ? item.siteMetrics[0].score : '未取得' }</Text>
                  {item.siteMetrics[1] && (
                    <>
                      {item.siteMetrics[0].score > item.siteMetrics[1].score ? (
                        <BadgeDelta className='w-[60px] py-0' deltaType='increase'>
                          <span className='text-xs'>{item.siteMetrics[0].score - item.siteMetrics[1].score}</span>
                        </BadgeDelta>
                      ) : item.siteMetrics[0].score < item.siteMetrics[1].score ? (
                        <BadgeDelta className='w-[60px] py-0' deltaType='decrease'>
                          <span className='text-xs'>{item.siteMetrics[1].score - item.siteMetrics[0].score}</span>
                        </BadgeDelta>
                      ) : (
                        <BadgeDelta className='w-[60px] py-0' deltaType="unchanged">
                          <span className='text-xs'>0</span>
                        </BadgeDelta>
                      )}
                    </>
                  )}
                  </div>
                )}
              </TableCell>
              <TableCell>
                <Text className='dark:text-white'>{item?.siteMetrics[0]?.updatedAt ? formatDate(item?.siteMetrics[0]?.updatedAt) : formatDate(item.createdAt)}</Text>
                { item?.siteMetrics[1]?.updatedAt && (
                <Bold className='text-xs mt-2'>
                  <span className='bg-gradient-to-r from-pink-400 via-indigo-500 to-violet-600
                    bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200
                    dark:to-sky-400'>前回: {formatDate(item?.siteMetrics[1]?.updatedAt)}</span>
                </Bold>) }
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
                <CursorArea>
                  <div
                    className='w-6'
                    data-cursor='block'
                  >
                    <TablePopup
                      className={index === sortedData.length - 1 || index === sortedData.length -2 ? 'bottom-8 -left-6' : 'top-4 -left-6'}
                      behaviorEdit={() => handleEdit(index)}
                      behaviorScoreAgain={() => handleClick(item.name, item.url, index, item.id, item.device)}
                      behaviorDelete={() => deleteItem(index, item.id, item.name, item.url, item.device)}
                    />
                  </div>
                </CursorArea>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

