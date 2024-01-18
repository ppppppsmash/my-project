'use client'

import { useState } from 'react'
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
import RegistrationButton from '@/components/Button/RegistrationButton'
import { urlValidate } from '@/utils/validation'

interface Props {
  onShow: boolean
  label: string
  text: string
  onOpen(): void
  onClose(): void
  siteRegistrate(id: number, userId: number, userName: string, progressCallback: (progress: number) => void): void
  id: number,
  userId: number,
  userName: string,
  name: string | string[]
  url: string
}

export default function RegistrationModal({ onShow, label, text, onOpen, onClose, siteRegistrate, id, userId, userName, name, url }: Props) {
  let [isOpen, setIsOpen] = useState(true)
  const [progress, setProgress] = useState<number>(0)

  function closeModal() {
    setIsOpen(false)
  }

  const handleClick = () => {
    siteRegistrate(id, userId, userName, setProgress)
    onClose()
  }

  const handleButtonClick = () => {
    onOpen()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <RegistrationButton
          label={label}
          clickEvent={handleButtonClick}
        />
      </AlertDialogTrigger>
      {onShow &&
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                {typeof name === 'string' ? (
                  <p>
                    サイト名: {name} <br/>
                    URL: {urlValidate(url)}
                  </p>
                ) : (
                  name.map((x, index) => (
                    <div key={index}>
                      サイト名: {x.split(/\s+/)[0]} <br />
                      {x.split(/\s+/)[1] && `URL: ${urlValidate(x.split(/\s+/)[1])}`}
                    </div>
                  ))
                ) }
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>いいえ</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClick}
          >
            はい
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      }
    </AlertDialog>
  )
}