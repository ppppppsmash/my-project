import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { Flex, Bold } from '@tremor/react'
import { useSession } from 'next-auth/react'
import { postData, patchData } from '@/utils/fetchData'
import { fetchLinkPreview } from '@/utils/getLinkPreview'
import { motion } from 'framer-motion'
import CircleLoader from 'react-spinners/CircleLoader'

const { Root, Trigger, Portal } = HoverCardPrimitive

interface HoverCardProps {}

const HoverCard = ({children, url, id, name, device}: {children: React.ReactNode, url: string, id: number, name: string, device: string}) => {
  const { data: session, status } = useSession()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [isSeoFetched, setIsSeoFetched] = useState<boolean>(false)

  const getImage = async () => {
    if (isSeoFetched) {
      return
    }

    const fetchMeta = await fetchLinkPreview(url)
    setTitle(fetchMeta.title)
    setDescription(fetchMeta.description)
    setImageUrl(fetchMeta.image)

    const seoInfo = {
      title: fetchMeta.title,
      description: fetchMeta.description,
      image: fetchMeta.image
    }

    const historyAction = {
      action: `SEO情報を取得した.`,
      user_id: Number(session?.user?.id),
      site_name: name,
      site_url: url,
      device
    }

    await patchData('psi_site_list', id, seoInfo)
    await postData('user_history', historyAction)

    setIsSeoFetched(true)
  }

  const onOpenChange = async () => {
    getImage()
  }

  return (
    <HoverCardPrimitive.Root onOpenChange={onOpenChange}>
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          align='center'
          sideOffset={4}
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'max-w-md rounded-lg p-4 md:w-full whitespace-pre break-all',
            'bg-white dark:bg-gray-800 p-4 rounded shadow-md',
            'focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75'
          )}
        >
          <motion.div
            className='w-[400px] pointer-events-none relative z-50 origin-top overflow-hidden !p-0'
            initial={{
              opacity: 0,
              scale: 0.965,
              y: 9,
              height:0
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: 250
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
              y: 8,
              height: 0
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <HoverCardPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />

            <div className='h-full w-full'>
              {imageUrl ? (
                <div className='mx-auto w-full'>
                  <h2 className='text-lg mb-4'>{title}</h2>
                  <p className='whitespace-normal mb-4'>{description}</p>
                  <img
                    className='w-1/2 mx-auto'
                    src={imageUrl}
                    width={500}
                    height={300}
                    alt='プレビューイメージ'
                  />
                </div>
                ) : (
                  <Flex className='flex-dirction justify-center gap-x-3'>
                    <CircleLoader size={20} />
                    <Bold className='animate-pulse'>
                      <span className='bg-gradient-to-r from-fuchsia-500 to-emerald-400
                        bg-clip-text font-bold tracking-tight text-transparent'>
                        Loading...
                      </span>
                    </Bold>
                  </Flex>
                )
              }
            </div>
          </motion.div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
}

export { HoverCard }