import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/Modals/ModalsLayout'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  isConfirm: boolean
}

export default function ConfirmModalTest({ isConfirm }: Props) {
  let [isOpen, setIsOpen] = useState(true)

  const router = useRouter()

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const navigateTo = (path: any) => {
    router.push(path)
  }

  const navigateFresh = (path: string) => {
    window.location.href = path
  }

  console.log(isConfirm)

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        はい
      </AlertDialogTrigger>

      {isConfirm &&
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>サイトを登録し続けますか？</AlertDialogTitle>
          <AlertDialogDescription>
            登録が終わる場合ページ一覧に遷移します。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>いいえ</AlertDialogCancel>
          <AlertDialogAction
          >
            はい
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      }
    </AlertDialog>
  )
}
