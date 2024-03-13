'use client'

import { IPadCursorProvider, useIPadCursor } from 'ipad-cursor/react'
import type { IpadCursorConfig } from 'ipad-cursor'

export default function cursorLayout({
  children
}: {
  children: React.ReactNode
}) {
  const config: IpadCursorConfig = {}
  useIPadCursor()

  return (
    <IPadCursorProvider config={config}>
      { children }
    </IPadCursorProvider>
  )
}