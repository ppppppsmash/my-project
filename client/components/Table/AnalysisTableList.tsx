import { useState, useEffect, Suspense } from 'react'
import { PSIDataType } from '@/type'
import { formatDate } from '@/utils/formatDate'
import { MdOutlineDelete } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { FiRotateCw } from 'react-icons/fi'
import Link from 'next/link'

interface Props {
  getScoreAgain: (url: string, index: number, id: number, device: string) => void
  deleteItem: (index: number,  id: number) => void
  pageList: PSIDataType[]
}

export default function AnalysisTableList({ getScoreAgain, deleteItem, pageList}: Props) {
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
        return prevState.filter((item: number) => item !== index);
      } else {
        return [...prevState, index];
      }
    })

    getScoreAgain(url, index, id, device)

    setTimeout(() => {
      setSpinningItems((prevSpinningItems) => prevSpinningItems.filter((item) => item !== index));
    }, 2000)
  }

  const getDisplayedTableData = () => {
    const startIndex = (currentTablePage - 1) * LIMIT_ROWS
    const endIndex = startIndex + LIMIT_ROWS
    return pageList.slice(startIndex, endIndex)
  }

  const handlePageChange = (tablePage: number) => {
    setCurrentTablePage(tablePage)
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
      {visible &&
      <div>
        <table className='w-full whitespace-nowrap'>
          <thead className='text-xs font-semibold tracking-wide text-left text-gray-100 dark:border-gray-700 bg-gray-50 dark:text-gray-200 dark:bg-gray-800'>
            <tr className='text-left '>
              <th className='px-4 py-3 text-sm text-center'>サイト名</th>
              <th className='px-4 py-3 text-sm text-center'>URL</th>
              <th className='px-4 py-3 text-sm text-center'>スコア</th>
              <th className='px-4 py-3 text-sm text-center'>取得日時</th>
              <th className='px-4 py-3 text-sm text-center'></th>
              <th className='px-4 py-3 text-sm text-center'></th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {getDisplayedTableData().map((page, index) => (
              <tr className='border-b hover:text-white hover:bg-gray-900 cursor-default' key={page.id}>
                <td className='px-4 py-1 font-semibold text-sm text-center underline'>
                  <p className='flex items-center space-x-2'>
                    <Link href={`/list/${page.id}`}>
                      {page.name}
                    </Link>
                    <FiEdit
                      size={20}
                      className='cursor-pointer'
                    />
                  </p>
                </td>
                <td className='px-4 py-1 text-sm text-center'>{page.url}</td>
                <td className='px-4 py-1 text-sm text-center'>{page.score}</td>
                <td className='px-4 py-1 text-sm text-center whitespace-pre'>{formatDate(page.date)}</td>
                <td className='px-4 py-1 w-[150px] text-center'>
                  <p className='flex justify-center'>
                    <FiRotateCw
                      className={`cursor-pointer hover:text-white ${
                        spinningItems.includes(index) ? 'animate-spin' : ''
                      }`}
                      size={22}
                      onClick={()=>handleClick(page.url, index, page.id, page.device)}
                    />
                  </p>
                </td>
                <td className='px-4 py-1 text-center w-[150px]'>
                  <p className='flex justify-center'>
                    <MdOutlineDelete
                      className='cursor-pointer'
                      size={25}
                      onClick={() => deleteItem(index, page.id)}
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-2 text-gray-500 dark:text-gray-400'>
          <ul className="flex space-x-2 justify-center">
            {pagination()}
          </ul>
        </div>
      </div>
      }
    </>
  )
}
