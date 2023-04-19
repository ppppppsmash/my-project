import React, { FC, Suspense } from 'react'

interface Props {
  pageList: {
    name: string,
    url: string,
    score: number,
    date: string,
  }[],
//  onClick(): void,
}

const PageScoreTable: FC<Props> = ({pageList}): JSX.Element => {
  return (
    <div>
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
          {pageList.map((page) => (
        <tr className='bg-gray-100 border-b border-gray-200' key='pageList.length'>
            <td className='px-4 py-3 font-bold'>{page.name}</td>
            <td className='px-4 py-3'>{page.url}</td>
            <td className='px-4 py-3'>{page.score}</td>
            <td className='px-4 py-3'>{page.date}</td>
            {/* <td className='px-4 py-3'>
              <button type='button' className='transition block w-full bg-gray-900 mt-4
              py-2 rounded-2xl text-white font-semibold mb-2 active:bg-gray-500
              hover:scale-[0.95] active:scale-[1]'
              onClick={() => onClick(page.url)}>再取得</button></td> */}
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PageScoreTable