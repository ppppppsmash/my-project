'use client'

import { IPadCursorProvider, useIPadCursor } from 'ipad-cursor/react'
import type { IpadCursorConfig } from 'ipad-cursor'
import { useCursorContext } from '@/components/ConText/CursorContext'

export default function CursorLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { coolCursor, setCoolCursor } = useCursorContext() as { coolCursor: boolean; setCoolCursor: React.Dispatch<React.SetStateAction<boolean>> }

  const config: IpadCursorConfig = {
    blockPadding: 'auto',
    className: 'none',
    enableAutoTextCursor: true,
    normalStyle: {
      backdropBlur: '20px',
    },
    blockStyle: {
      backdropBlur: '0px',
      durationBackdropFilter: '1s',
    },
  }
  useIPadCursor()

  return (
    <>
    { coolCursor ? (
      <IPadCursorProvider config={config}>
        { children }
      </IPadCursorProvider>
    ) : (
      <>
        { children }
      </>
    )}
    </>
  )
}