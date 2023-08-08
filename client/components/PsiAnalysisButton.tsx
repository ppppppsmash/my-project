import { Button } from '@tremor/react'

interface Props {
  label: string
  id: number
  getScore: (id: number) => void
}

export default function PsiAnalysisButton({ label, id, getScore }: Props) {
  const handleClick = () => {
    getScore(id)
  }

  return (
    <Button
      className='w-[150px] bg-gray-900 hover:bg-gray-700
      py-2 px-4 rounded active:bg-gray-500
      duration-150 focus:shadow-outline ease-in-out'
      color='gray'
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}
