import { FC } from 'react'
import { ApiResultType } from '@/type'
import { RxCross2 } from 'react-icons/rx'

interface Props {
  getScoreAgain: (url: any) => void
  pageList: ApiResultType[]
}

const AnalysisTableAll: FC<Props> = ({ getScoreAgain, pageList}): JSX.Element => {
  return (
    <section>
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
          {pageList.map((page) => (
            <tr className='border-b hover:text-white hover:bg-gray-900' key={page.name}>
              <td className='px-4 py-3 font-semibold text-center'>{page.name}</td>
              <td className='px-4 py-3 text-center'>{page.url}</td>
              <td className='px-4 py-3 text-center'>{page.score}</td>
              <td className='px-4 py-3 text-center'>{page.date}</td>
              <td className='px-4 py-3'>
                <button type='button' className='transition block w-full bg-gray-900 mt-4
                py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                hover:scale-[0.95] active:scale-[1] hover:bg-white hover:text-gray-900'
                onClick={()=>getScoreAgain(page.url)}
                >再取得
                </button>
              </td>
              <td className='px-4 py-3 text-center'><RxCross2 /></td>
            </tr>
          ))}
          <tr className='border-b hover:text-white hover:bg-gray-900' key='1'>
          <td className='px-4 py-3 font-semibold text-center'>test</td>
              <td className='px-4 py-3 text-center'>test</td>
              <td className='px-4 py-3 text-center'>test</td>
              <td className='px-4 py-3 text-center'>test</td>
              <td className='px-4 py-3'>
                <button type='button' className='transition block w-full bg-gray-900 mt-4
                py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                hover:scale-[0.95] active:scale-[1] hover:bg-white hover:text-gray-900'
                >再取得
                </button>
              </td>
              <td className='px-4 py-3 text-center'>
                <p className='flex justify-center hover:bg-white hover:text-gray-900
                transition w-full bg-gray-900 mt-4 cursor-pointer
                py-2 rounded text-white font-semibold mb-2 active:bg-gray-500
                hover:scale-[0.95] active:scale-[1]'>DELETE</p></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default AnalysisTableAll