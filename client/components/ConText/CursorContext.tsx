'use client'

import { createContext, useState, useContext } from 'react'

export const CursorContext = createContext<{ coolCursor: boolean; setCoolCursor: React.Dispatch<React.SetStateAction<boolean>> } | null>(null)

export const CursorContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [coolCursor, setCoolCursor] = useState<boolean>(true)

  return (
    <CursorContext.Provider value={{coolCursor, setCoolCursor}}>
      { children }
    </CursorContext.Provider>
  )
}

export function useCursorContext() {
  return useContext(CursorContext)
}