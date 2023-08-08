import { useState, useEffect, ChangeEvent } from 'react'
import { PSIDataType } from '@/type'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  TextInput
} from '@tremor/react'
import { XMarkIcon, CheckIcon, LinkIcon } from '@heroicons/react/24/outline'
import PsiPopup from '@/components/PsiPopup'
import { patchData } from '@/utils/fetchData'

interface Props {
  getScoreAgain: (url: string, index: number, id: number, device: string) => void
  //postNameChange: (editName: string, id: number) => void
  deleteItem: (index: number,  id: number) => void
  pageList: PSIDataType[]
}

export default function PsiTable({ getScoreAgain, deleteItem, pageList }: Props) {
  const [editName, setEditName] = useState<string[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)
  const [spinningItems, setSpinningItems] = useState<any[]>([])
  const LIMIT_ROWS = 10
  const totalTablePages = Math.ceil(pageList.length / LIMIT_ROWS)

  const handleClick = (url: string, index: number, id: number, device: string) => {
    setLoadingVisible(true)
    setSpinningItems((prevState: any) => {
      if (prevState.includes(index)) {
        return prevState.filter((item: number) => item !== index)
      } else {
        return [...prevState, index]
      }
    })

    getScoreAgain(url, index, id, device)

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

  const handleEdit = (index: number) => {
    setEditIndex(index)
    setIsEdited(false)
  }

  const getDisplayedTableData = () => {
    const startIndex = (currentTablePage - 1) * LIMIT_ROWS
    const endIndex = startIndex + LIMIT_ROWS
    return pageList.slice(startIndex, endIndex)
  }

  const handlePageChange = (tablePage: number) => {
    setCurrentTablePage(tablePage)
  }

  const handleNameChange = async (index: number, id: number) => {
    await patchData('api', id, {name: editName[index]})
    setEditIndex(null)
    setIsEdited(true)
  }

  const pagination = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalTablePages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`mx-1 px-2 rounded cursor-default hover:text-white hover:bg-gray-900 ${
            i === currentTablePage ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      )
    }
    return pageNumbers
  }

  useEffect(() => {
    pageList.length ? setVisible(true) : setVisible(false)
  }, [pageList])

  return (
    <>
      <Title>PSI</Title>
      <Table className="mt-5 overflow-visible">
        <TableHead>
          <TableRow>
            <TableHeaderCell>site名</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell>psi score</TableHeaderCell>
            <TableHeaderCell>date</TableHeaderCell>
            <TableHeaderCell>action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getDisplayedTableData().map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
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
              </TableCell>
              <TableCell>
                <Text>{item.url}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.score}</Text>
              </TableCell>
              <TableCell>
                <Text>{formatDate(item.date)}</Text>
              </TableCell>
              <TableCell>
                <PsiPopup
                  behaviorEdit={()=>handleEdit(index)}
                  behaviorScoreAgain={()=>handleClick(item.url, index, item.id, item.device)}
                  behaviorDelete={()=>deleteItem(index, item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-2 text-gray-500 dark:text-gray-400'>
        <ul className="flex space-x-2 justify-center">
          {pagination()}
        </ul>
      </div>
    </>
  )
}
