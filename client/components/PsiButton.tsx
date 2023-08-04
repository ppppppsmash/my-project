import { Button } from '@tremor/react'

interface Props {
  label: string
  setOpen: (value: boolean) => void
  id: number
}

export default function PsiButton({label, setOpen}: Props) {
  const handleClick = () => {
    setOpen(true)
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
