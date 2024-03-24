'use client'

import { IPadCursorProvider, useIPadCursor } from 'ipad-cursor/react'
import type { IpadCursorConfig } from 'ipad-cursor'
import { useCursorContext } from '@/components/LayoutComponents/CursorContext'

export default function CursorLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { coolCursor, setCoolCursor } = useCursorContext() as { coolCursor: boolean; setCoolCursor: React.Dispatch<React.SetStateAction<boolean>> }

  const config: IpadCursorConfig = {
    blockPadding: 'auto',
    blockStyle: {
    },
    className: 'none',
    enableAutoTextCursor: true,
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