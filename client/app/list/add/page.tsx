'use client'

import { useState } from 'react'
import dynamicImport from 'next/dynamic'
import { zenKaku } from '@/utils/font'
import { Grid, Card, Title, Bold, Text } from '@tremor/react'
import { useSession } from 'next-auth/react'

const DynamicComponent = dynamicImport(() => import('@/components/Tab/RegistrationTab'))

export default function AddList() {
  const { data: session } = useSession()

  const [name, setName] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const handleNameValueChange = (newValue: any) => {
    setName(newValue)
  }

  const handleUrlValueChange = (newValue: any) => {
    setUrl(newValue)
  }

  const handleTitleValueChange = (newValue: any) => {
    setTitle(newValue)
  }

  const handleDescriptionValueChange = (newValue: any) => {
    setDescription(newValue)
  }

  const handleImageValueChange = (newValue: any) => {
    setImage(newValue)
  }

  return (
    <>
      { session &&
        <div>
          <Title className={`dark:text-white ${zenKaku.className} relative md:text-xl dark:text-white dark:after:from-white after:block after:bg-bottom
              after:bg-gradient-to-r after:from-gray-700 after:via-gray-300 after:to-transparent after:h-[1px]`}>
            ページ登録
          </Title>

          <Grid numColsLg={2} className="mt-6 gap-6">
            <Card className='mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
              <div>
                <Bold>
                  サイト名：
                </Bold>
                <Text className='mt-2'>
                  { name }
                </Text>
              </div>

              <div className='mt-6'>
                <Bold>
                  サイトURL：
                </Bold>
                <Text className='mt-2'>
                  { url }
                </Text>
              </div>

              <div>
                { title }
                { description }

                <img
                  src={image}
                  width='200'
                />
              </div>
            </Card>

            <Card className='mt-6 shadow-lg dark:bg-gray-950 dark:text-white'>
              <DynamicComponent
                _name={handleNameValueChange}
                _url={handleUrlValueChange}
                _title={handleTitleValueChange}
                _description={handleDescriptionValueChange}
                _image={handleImageValueChange}
              />
            </Card>
          </Grid>
        </div>
      }
    </>
  )
}
