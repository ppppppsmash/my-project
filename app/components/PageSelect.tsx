import { FC, ReactNode, useState } from 'react'

interface Props {
  handlePageSelect: (e: any) => void
  pageList: {
    name: string,
    url: string,
    score: number,
    date: string,
  }[]
  onClick(a: string): void,
}

const PageSelect: FC<Props> = (props): JSX.Element => {
  const [selectedPage, setSelectedPage] = useState(props.pageList[0])

  const handlePageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageName = e.target.value
    const selected = props.pageList.find(page => page.name === pageName)
    if (selected) {
      setSelectedPage(selected)
    }
  }

  return (
    <div>
      <select
          id='pageSelect'
          className='block w-full mt-2 py-2 px-3 border border-gray-300
          bg-white rounded-md focus:outline-none focus:ring-1
          focus:ring-blue-500 focus:border-blue-500'
          onChange={handlePageSelect}
      >
        <option value=''>ページを選択してください.</option>
        {props.pageList.map((page, index)=> (
          <option key={index} value={page.name}>{page.name}</option>
        ))}
        
      </select>
      
      {selectedPage && (
        <div>
          <h3 className='text-xl font-bold mx-auto w-full mt-8'>{selectedPage.name}</h3>
          <table className='rounded-t-lg my-2 w-full mx-auto bg-gray-200 text-gray-800'>
            <thead>
              <tr className='text-left border-b-2 border-gray-300'>
                <th className='px-4 py-3'>URL</th>
                <th className='px-4 py-3'>スコア</th>
                <th className='px-4 py-3'>取得日時</th>
              </tr>
            </thead>
            <tbody>
            <tr className='bg-gray-100 border-b border-gray-200'>
                <td className='px-4 py-3'>{selectedPage.url}</td>
                <td className='px-4 py-3'>{selectedPage.score}</td>
                <td className='px-4 py-3'>{selectedPage.date}</td>
                <td className='px-4 py-3'>
                  <button type='button' className='transition block w-full bg-gray-900 mt-4
                  py-2 rounded-2xl text-white font-semibold mb-2 active:bg-gray-500
                  hover:scale-[0.95] active:scale-[1]'
                  onClick={() => props.onClick(selectedPage.url)}>再取得</button></td>
              </tr>
            </tbody>
          </table>
          </div>
        )}
    </div>
  )
}

export default PageSelect