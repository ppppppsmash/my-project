'use client'

import { useState, createContext } from 'react'
import dynamicImport from 'next/dynamic'
import { zenKaku } from '@/utils/font'
import { Grid, Card, Title, Bold, Text, Col } from '@tremor/react'
import { urlValidate } from '@/utils/validation'

const DynamicComponent = dynamicImport(() => import('@/components/Tab/RegistrationTab'))

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

export default function AddPage() {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')

  return (
    <>
      <div>
        <Title className={`dark:text-white ${zenKaku.className} relative md:text-xl dark:text-white dark:after:from-white after:block after:bg-bottom
            after:bg-gradient-to-r after:from-gray-700 after:via-gray-300 after:to-transparent after:h-[1px]`}>
          ページ登録
        </Title>

        <Grid numColsLg={3} className="mt-6 gap-6">
          <Col numColSpanSm={1}>
            <Card className='mt-6 shadow-lg dark:bg-gray-950 dark:text-white duration-300 transition ease-in-out'>

              {image &&
              <div className='text-center'>
                <img
                  src={image}
                  width='200'
                  alt={title}
                />
              </div>
              }

              { name &&
              <div className='mt-6'>
                <Bold>
                  サイト名：
                </Bold>
                <Text className='mt-2'>
                  { name }
                </Text>
              </div>
              }

              { url &&
              <>
                <div className='mt-6'>
                  <Bold>
                    URL：
                  </Bold>
                  <Text className='mt-1'>
                    { urlValidate(url) }
                  </Text>
                </div>

                <div className='mt-6'>
                  <Bold>
                    Description：
                  </Bold>
                  <Text className='mt-1'>
                    { description }
                  </Text>
                </div>
              </>
              }

              <div className={`${!name && !url ? 'block' : 'hidden'} w-full mx-auto`}>
                <Text className='text-center animate-pulse'>
                  <span className='bg-gradient-to-r from-fuchsia-500 to-emerald-400
                    bg-clip-text font-bold tracking-tight text-transparent'>
                    登録情報プレビュー<br />
                    （現在複数登録とCSV登録は実装中...）
                  </span>
                </Text>
              </div>

            </Card>
          </Col>

          <Col numColSpanSm={2}>
            <Card className='elevation-10 mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
            <PreviewContext.Provider value={{name, setName, url, setUrl, title, setTitle, description, setDescription, image, setImage }}>
              <DynamicComponent />
            </PreviewContext.Provider>
            </Card>
          </Col>
        </Grid>
      </div>
    </>
  )
}
