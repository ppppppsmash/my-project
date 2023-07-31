import { FC, MouseEventHandler } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PSIDataType } from '@/type'
import { formatDate } from '@/utils/formatDate'
import Loading from '@/components/Loading'
import { getData } from '@/utils/fetchData'
import Link from 'next/link'

interface Props {
  getScoreAgain: (url: string, index: number, id: number, device: string) => void
  deleteItem: (index: number,  id: number) => void
  pageList: PSIDataType[]
}

const AnalysisTableAll: FC<Props> = ({ getScoreAgain, deleteItem, pageList}): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)
  const [currentTablePage, setCurrentTablePage] = useState<number>(1)
  const LIMIT_ROWS = 10

  const totalTablePages = Math.ceil(pageList.length / LIMIT_ROWS)

  const router = useRouter()

  const handleClick = (url: string, index: number, id: number, device: string) => {
    setLoadingVisible(true)
    getScoreAgain(url, index, id, device)
  }

  const handleDetailPage = (id: number) => {
    router.push(`/list/${id}`)
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
          className={`mx-1 px-2 rounded ${
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
              <tr className='border-b hover:text-white hover:bg-gray-900 cursor-pointer' key={page.id}>
                <td className='px-4 py-1 font-semibold text-sm text-center underline'>
                  <Link href={`/list/${page.id}`}>
                    {page.name}
                  </Link>
                </td>
                <td className='px-4 py-1 text-sm text-center'>{page.url}</td>
                <td className='px-4 py-1 text-sm text-center'>{page.score}</td>
                <td className='px-4 py-1 text-sm text-center whitespace-pre'>{formatDate(page.date)}</td>
                <td className='px-4 py-1 w-[150px]'>
                  <button
                    type='button'
                    className='transition text-sm block w-full bg-gray-900 mt-4
                      py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                      hover:scale-[0.95] active:scale-[1] hover:bg-white hover:text-gray-900'
                    onClick={()=>handleClick(page.url, index, page.id, page.device)}
                  >
                    再取得
                  </button>
                </td>
                <td className='px-4 py-1 text-center w-[150px]'>
                  <button
                    className='flex text-sm justify-center hover:bg-white hover:text-gray-900
                      transition w-full bg-gray-900 mt-4 cursor-pointer
                      py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                      hover:scale-[0.95] active:scale-[1]'
                    onClick={() => deleteItem(index, page.id)}
                  >
                    削除
                  </button>
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

export default AnalysisTableAll