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

  const router = useRouter()

  const handleClick = (url: string, index: number, id: number, device: string) => {
    setLoadingVisible(true)
    getScoreAgain(url, index, id, device)
  }

  const handleDetailPage = (id: number) => {
    router.push(`/list/${id}`)
  }

  useEffect(() => {
    pageList.length ? setVisible(true) : setVisible(false)
  }, [pageList])

  return (
    <section>
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
          {pageList.map((page, index) => (
              <tr className='border-b hover:text-white hover:bg-gray-900 cursor-pointer' key={page.id}>
                <td className='px-4 py-3 font-semibold text-sm text-center underline'>
                  <Link href={`/list/${page.id}`}>
                    {page.name}
                  </Link>
                </td>
                <td className='px-4 py-3 text-sm text-center'>{page.url}</td>
                <td className='px-4 py-3 text-sm text-center'>{page.score}</td>
                <td className='px-4 py-3 text-sm text-center whitespace-pre'>{formatDate(page.date)}</td>
                <td className='px-4 py-3'>
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
                <td className='px-4 py-3 text-center'>
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
      <div className='px-4 py-3 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800'>

      </div>
      </div>
      }
    </section>
  )
}

export default AnalysisTableAll