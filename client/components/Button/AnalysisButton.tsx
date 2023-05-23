import { NextPage } from 'next'

interface Props {
  label: string
}

const AnalysisButton: NextPage<Props> = ({label}): JSX.Element => {
  return (
    <button
      className='w-full bg-gray-900 hover:bg-gray-700 text-white
      font-bold py-2 px-4 rounded active:bg-gray-500 active:scale-[1]
      duration-150 focus:shadow-outline ease-in-out hover:scale-[0.95]'
    >
      {label}
    </button>
  )
}

export default AnalysisButton