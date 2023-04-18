import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  selectedPages: string[]
  handlePageSelect: (e: any) => void
}

const PageSelect: FC<Props> = (props): JSX.Element => {
  return (
    <div>
      <select
          id='pageSelect'
          className='block w-full mt-2 py-2 px-3 border border-gray-300
          bg-white rounded-md focus:outline-none focus:ring-1
          focus:ring-blue-500 focus:border-blue-500'
          onChange={props.handlePageSelect}
      >
        {props.selectedPages.map((selectedPage, index)=> (
          <option key={index} value={selectedPage}>{selectedPage}</option>
        ))}
        
      </select>
      {props.children}
    </div>
  )
}

export default PageSelect