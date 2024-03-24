'use client'

import { useState, createContext, useEffect } from 'react'
import dynamicImport from 'next/dynamic'
import { zenKaku } from '@/utils/font'
import { Grid, Card, Title, Bold, Text, Col } from '@tremor/react'
import { urlValidate } from '@/utils/validation'
import { ConstructionIcon } from 'lucide-react'

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
  schedule: string
  setSchedule: React.Dispatch<React.SetStateAction<string>>
  selectedDevice: string[]
  setSelectedDevice: React.Dispatch<React.SetStateAction<string[]>>
  names: string[]
  setNames: React.Dispatch<React.SetStateAction<string[]>>
  csvData: any[]
  setCsvData: React.Dispatch<React.SetStateAction<any[]>>
})

export default function AddPage() {
  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [schedule, setSchedule] = useState<string>('')
  const [selectedDevice, setSelectedDevice] = useState<string[]>([])
  const [names, setNames] = useState<string[]>([])
  const [csvData, setCsvData] = useState<any[]>([])

  useEffect(() => {
    if (names.length === 1 && names[0] === "") {
      setNames([]);
    }
  }, [names])

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

              { image &&
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
                <Bold className='animate-tracking-in-expand'>
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
                  <Bold className='mt-2 animate-tracking-in-expand'>
                    URL：
                  </Bold>
                  <Text className='mt-1'>
                    { urlValidate(url) }
                  </Text>
                </div>

                <div className='mt-6'>
                  <Bold className='mt-2 animate-tracking-in-expand'>
                    Description：
                  </Bold>
                  <Text className='mt-1'>
                    { description }
                  </Text>
                </div>
              </>
              }

              { names.map((name, index) => (
                name &&
                <>
                  <div className='mt-6 animate-tracking-in-expand'>
                    <Bold>
                      サイト名：
                    </Bold>

                    <Text className='mt-1' key={index}>
                      {name.split(' ')[0]}
                    </Text>
                  </div>

                  { name.includes(' ') &&
                  <div className='mt-1 animate-tracking-in-expand'>
                    <Bold>
                      URL：
                    </Bold>

                    <Text className='mt-1' key={index}>
                      {urlValidate(name.split(' ')[1])}
                    </Text>
                  </div>
                  }
                </>
              ))}

              { csvData.map((csv, index) => (
                <>
                  <div className='mt-6' key={index}>
                    <Bold className='animate-tracking-in-expand'>
                        サイト名：
                    </Bold>
                    <Text className='mt-1'>
                      { csv.NAME }
                    </Text>
                  </div>

                  <div className='mt-6'>
                    <Bold className='animate-tracking-in-expand'>
                      URL：
                    </Bold>
                    <Text className='mt-1'>
                      { csv.URL }
                    </Text>
                  </div>
                </>
              ))}

              { schedule &&
                <div className='mt-6'>
                  <Bold className='animate-tracking-in-expand'>
                    Scheduler
                  </Bold>
                  <Text className='mt-1'>
                    { schedule } 時間ごと自動実行
                  </Text>
                </div>
              }

              { selectedDevice.length != 0 &&
                <div className='mt-6'>
                  <Bold className='animate-tracking-in-expand'>
                    デバイス
                  </Bold>
                  {selectedDevice.map((device, index) => (
                    <Text className='mt-1' key={index}>
                      { device }
                    </Text>
                  ))}
                </div>
              }

              <div className={`${!name && !url && !title && !description && !image && !schedule && !selectedDevice.length && !names.length && !csvData.length ? 'block animate-scale-up-center' : 'hidden'} w-full mx-auto`}>
                <Text className='text-center animate-pulse'>
                  <span
                    className='bg-gradient-to-r from-fuchsia-500 to-emerald-400
                      bg-clip-text font-bold tracking-tight text-transparent'
                    >
                    登録情報プレビュー
                  </span>
                </Text>
              </div>

            </Card>
          </Col>

          <Col numColSpanSm={2}>
            <Card className='elevation-10 mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
              <PreviewContext.Provider value={{
                name, setName, url, setUrl, title, setTitle, description, setDescription, image, setImage, schedule, setSchedule, selectedDevice, setSelectedDevice, names, setNames, csvData, setCsvData
              }}>
                <DynamicComponent />
              </PreviewContext.Provider>
            </Card>
          </Col>
        </Grid>
      </div>
    </>
  )
}
