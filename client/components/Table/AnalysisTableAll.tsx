import { FC } from 'react'
import { useState, useEffect } from 'react'
import { PSIDataType } from '@/type'
import { formatDate } from '@/lib/formatDate'
import Loading from '@/components/Loading'

interface Props {
  getScoreAgain: (url: string, index: number, id: number) => void
  deleteItem: (index: number,  id: number) => void
  pageList: PSIDataType[]
}

const AnalysisTableAll: FC<Props> = ({ getScoreAgain, deleteItem, pageList}): JSX.Element => {
  const [visible, setVisible] = useState(false)
  const [loadingVisible, setLoadingVisible] = useState(false)

  const handleClick = (url: string, index: number, id: number) => {
    setLoadingVisible(true)
    getScoreAgain(url, index, id)
  }

  useEffect(() => {
    pageList.length ? setVisible(true) : setVisible(false)
  }, [pageList])

  return (
    <section>
      {visible &&
      <table className='rounded my-2 w-full mx-auto text-white border-b-2 border-gray-300'>
        <thead className='bg-black'>
          <tr className='text-left '>
            <th className='px-4 py-3 font-normal text-center'>サイト名</th>
            <th className='px-4 py-3 font-normal text-center'>URL</th>
            <th className='px-4 py-3 font-normal text-center'>スコア</th>
            <th className='px-4 py-3 font-normal text-center'>取得日時</th>
            <th className='px-4 py-3 font-normal text-center'></th>
            <th className='px-4 py-3 font-normal text-center'></th>
          </tr>
        </thead>
        <tbody className='text-gray-900'>
          {pageList.map((page, index) => (
            <tr className='border-b hover:text-white hover:bg-gray-900' key={page.id}>
              <td className='px-4 py-3 font-semibold text-center'>{page.name}</td>
              <td className='px-4 py-3 text-center'>{page.url}</td>
              <td className='px-4 py-3 text-center'>{page.score}</td>
              <td className='px-4 py-3 text-center whitespace-pre'>{formatDate(page.date)}</td>
              <td className='px-4 py-3'>
                <button
                  type='button'
                  className='transition block w-full bg-gray-900 mt-4
                    py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                    hover:scale-[0.95] active:scale-[1] hover:bg-white hover:text-gray-900'
                  onClick={()=>handleClick(page.url, index, page.id)}
                >
                  再取得
                </button>
              </td>
              <td className='px-4 py-3 text-center'>
                <button
                  className='flex justify-center hover:bg-white hover:text-gray-900
                    transition w-full bg-gray-900 mt-4 cursor-pointer
                    py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                    hover:scale-[0.95] active:scale-[1]'
                  onClick={() => deleteItem(index, page.id)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </section>
  )
}

export default AnalysisTableAll