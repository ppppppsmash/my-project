import { FC } from 'react'
import { ApiResultType } from '@/type'

interface Props extends ApiResultType {
  getScoreAgain?: () => void
}

const AnalysisTable: FC<Props> = ({name, url, score, date, getScoreAgain}): JSX.Element => {
  return (
    <table className='rounded my-2 w-full mx-auto text-white border-b-2 border-gray-300'>
      <thead className='bg-black'>
        <tr className='text-left '>
          <th className='px-4 py-3'>サイト名</th>
          <th className='px-4 py-3'>URL</th>
          <th className='px-4 py-3'>スコア</th>
          <th className='px-4 py-3'>取得日時</th>
          <th className='px-4 py-3'></th>
        </tr>
      </thead>
      <tbody className='text-gray-900'>
        <tr className='border-b' key={name}>
          <td className='px-4 py-3 font-bold'>{name}</td>
          <td className='px-4 py-3'>{url}</td>
          <td className='px-4 py-3'>{score}</td>
          <td className='px-4 py-3'>{date}</td>
          <td className='px-4 py-3'>
            <button type='button' className='transition block w-full bg-gray-900 mt-4
            py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
            hover:scale-[0.95] active:scale-[1]'
            onClick={getScoreAgain}
            >再取得
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default AnalysisTable