'use client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useState, useEffect, ChangeEvent } from 'react'
import { PSIDataType } from '@/type'
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
  MultiSelectBoxItem
} from '@tremor/react'
import {
  XMarkIcon,
  CheckIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import PsiPopup from '@/components/PsiPopup'
import PsiSelect from '@/components/PsiSelect'
import { deleteData, getData, getDataAll, patchData } from '@/utils/fetchData'
import { getPsiData, getPsiDataAgain } from '@/utils/getPsi'
import { formatDate } from '@/utils/formatDate'
import { FiLoader } from 'react-icons/fi'
import { fetchLinkPreview } from '@/utils/getLinkPreview'
import Image from 'next/image'
import { HoverCard } from './HoverCard'

export default function PsiTable() {
  const [selectedNames, setSelectedNames] = useState<string[]>([])
  const [pageList, setPageList] = useState<PSIDataType[]>([])
  const [editName, setEditName] = useState<string[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [schedule, setSchedule] = useState('0')
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const LIMIT_ROWS = 10


  const isSiteSelected = (siteList: PSIDataType) => {
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
    }, 2000)
  }


  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = target.value
    setEditName((prevState) => {
      const updatedEditName = [...prevState]
      updatedEditName[index] = value
      return updatedEditName
    })
  }

  // ページごと表示できる項目制限
  const getDisplayedTableData = () => {
    const startIndex = (currentTablePage - 1) * LIMIT_ROWS
    const endIndex = startIndex + LIMIT_ROWS
    return pageList.slice(startIndex, endIndex)
  }

  // カレントページ
  const handlePageChange = (tablePage: number) => {
    setCurrentTablePage(tablePage)
  }

  // Editボタントリガー
  const handleEdit = (index: number) => {
    setEditIndex(index)
    setIsEdited(false)
  }

  // site名変更処理
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

  // セレクトボックスチェンジ
  const getChangeSelect = (value: string) => {
    setSchedule(value)
  }

  // スケジュール変更
  const handleScheduleChange = async (id: number) => {
    await patchData('psi_site_list', id, { schedule })
    setEditIndex(null)
    setIsEdited(true)
  }

  const queryClient = useQueryClient()

  const getDataByAll = async () => {
    const data = await getDataAll('psi_site_list')
    return data
  }

  const { data: result, isLoading } = useQuery<PSIDataType[]>({
    queryKey: ['result'],
    queryFn: getDataByAll,
    refetchInterval: 10000
  })

  const deleteItem = async (index: number, id: number) => {
    await deleteData('psi_site_list', id)

    const newResult = result.filter(item => item.id !== id)
    queryClient.setQueryData(['result'], newResult)
  }

  if(isLoading) return (<h1 className='text-lg text-center'>🌀Loading...</h1>)
  if (!result) return <h1 className='text-lg text-center'>データがありません。</h1>

  return (
    <div className='dark:bg-gray-950'>
      <MultiSelectBox
        onValueChange={setSelectedNames}
        placeholder="検索..."
        className="max-w-xs ml-4 mt-8 dark:bg-gray-950"
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

      <Table className='mt-2 overflow-visible'>
        <TableHead>
          <TableRow>
            <TableHeaderCell className='dark:text-white'>Site</TableHeaderCell>
            <TableHeaderCell className='dark:text-white'>URL</TableHeaderCell>
            <TableHeaderCell className='dark:text-white'>PSI score</TableHeaderCell>
            <TableHeaderCell className='dark:text-white'>Date</TableHeaderCell>
            <TableHeaderCell className='dark:text-white'>Schedule</TableHeaderCell>
            <TableHeaderCell className='dark:text-white'>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className='dark:text-white'>
          {result?.filter((item) => isSiteSelected(item)).map((item, index) => (
            <TableRow
              className='hover:bg-gray-100 dark:hover:bg-gray-700'
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
                    <Link
                      className='underline'
                      href={`/list/${item.id}`}>
                      {editName[index] || item.name}
                    </Link>
                )
              }
              </p>
              </TableCell>
              <TableCell>
                <Text className='underline decoration-dotted dark:text-white'>
                  <HoverCard url={item.url}>
                    <Link href={{pathname: item.url}} target='_blank'>
                      {item.url}
                    </Link>
                  </HoverCard>
                </Text>
              </TableCell>
              <TableCell>
                {spinningItems.includes(index) ? (
                  <FiLoader
                    className='animate-spin w-5 text-gray-950'
                  />
                ) : (
                  <Text className='dark:text-white'>{item.siteMetrics.slice().reverse()[0].score}</Text>
                )}
              </TableCell>
              <TableCell>
              <Text className='dark:text-white'>{formatDate(item.siteMetrics.slice().reverse()[0].updatedAt) || formatDate(item.createdAt)}</Text>
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
                  behaviorEdit={()=>handleEdit(index)}
                  behaviorScoreAgain={()=>handleClick(item.name, item.url, index, item.id, item.device)}
                  behaviorDelete={()=>deleteItem(index, item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
