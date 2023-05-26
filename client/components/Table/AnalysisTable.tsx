import { FC } from 'react'
import { ApiResultType } from '@/type'

const AnalysisTable: FC<ApiResultType> = ({name, url, score, date}): JSX.Element => {
  return (
    <table className='rounded-t-lg my-2 w-full mx-auto bg-gray-200 text-gray-800'>
      <thead>
        <tr className='text-left border-b-2 border-gray-300'>
          <th className='px-4 py-3'>サイト名</th>
          <th className='px-4 py-3'>URL</th>
          <th className='px-4 py-3'>スコア</th>
          <th className='px-4 py-3'>取得日時</th>
        </tr>
      </thead>
      <tbody>
        <tr className='bg-gray-100 border-b border-gray-200' key='pageList.length'>
          <td className='px-4 py-3 font-bold'>{name}</td>
          <td className='px-4 py-3'>{url}</td>
          <td className='px-4 py-3'>{score}</td>
          <td className='px-4 py-3'>{date}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default AnalysisTable