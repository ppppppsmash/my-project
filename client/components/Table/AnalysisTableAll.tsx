import { FC } from 'react'
import { ApiResultType } from '@/type'

interface Props {
  getScoreAgain?: () => void
  pageList: ApiResultType[]
}

const AnalysisTableAll: FC<Props> = ({ getScoreAgain, pageList}): JSX.Element => {
  return (
    <table className='rounded my-2 w-full mx-auto text-white border-b-2 border-gray-300'>
      <thead className='bg-black'>
        <tr className='text-left '>
          <th className='px-4 py-3 font-normal'>サイト名</th>
          <th className='px-4 py-3 font-normal'>URL</th>
          <th className='px-4 py-3 font-normal'>スコア</th>
          <th className='px-4 py-3 font-normal'>取得日時</th>
          <th className='px-4 py-3 font-normal'></th>
        </tr>
      </thead>
      <tbody className='text-gray-900'>
        {pageList.map((page) => (
          <tr className='border-b hover:text-white hover:bg-gray-900' key={page.name}>
            <td className='px-4 py-3 font-semibold'>{page.name}</td>
            <td className='px-4 py-3'>{page.url}</td>
            <td className='px-4 py-3'>{page.score}</td>
            <td className='px-4 py-3'>{page.date}</td>
            <td className='px-4 py-3'>
              <button type='button' className='transition block w-full bg-gray-900 mt-4
              py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
              hover:scale-[0.95] active:scale-[1]'
              onClick={getScoreAgain}
              >再取得
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AnalysisTableAll