import { Button } from '@tremor/react'

interface Props {
  label: string
  setOpen: () => void
  disabled: boolean
}

export default function PsiButton({label, setOpen, disabled}: Props) {
  const handleClick = () => {
    setOpen()
  }

  return (
    <Button
      className='w-[150px] bg-gray-900 hover:bg-gray-700
      py-2 px-4 rounded active:bg-gray-500 dark:bg-white dark:text-gray-950
      duration-150 focus:shadow-outline ease-in-out'
      color='gray'
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </Button>
  )
}
