'use client'

import { createContext, useState, useContext } from 'react'

export const PreviewContext = createContext({} as {
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  url: string
  setUrl: React.Dispatch<React.SetStateAction<string>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  image: string
  setImage: React.Dispatch<React.SetStateAction<string>>
})

export const PreviewContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')

  return (
    <PreviewContext.Provider value={{name, setName, url, setUrl, title, setTitle, description, setDescription, image, setImage }}>
      { children }
    </PreviewContext.Provider>
  )
}

export function usePreviewContext() {
  return useContext(PreviewContext)
}