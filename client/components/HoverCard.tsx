import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { fetchLinkPreview } from '@/utils/getLinkPreview'
import { motion } from 'framer-motion'

const { Root, Trigger, Portal } = HoverCardPrimitive

interface HoverCardProps {}

const HoverCard = ({children, url}: {children: React.ReactNode, url: string}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const getImage = async () => {
    const fetchMeta = await fetchLinkPreview(url)
    setTitle(fetchMeta.title)
    setDescription(fetchMeta.description)
    setImageUrl(fetchMeta.image)
  }

  const onOpenChange = (): void => {
    getImage()
  }

  return (
    <HoverCardPrimitive.Root onOpenChange={onOpenChange}>
      <HoverCardPrimitive.Trigger asChild>
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Content
        align='center'
        sideOffset={4}
        className={clsx(
          ' radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
          'max-w-md rounded-lg p-4 md:w-full whitespace-pre break-all',
          'bg-white dark:bg-gray-800 p-4 rounded shadow-md',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
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
                  className='w-10/12 mx-auto'
                  src={imageUrl}
                  width={500}
                  height={300}
                  alt='プレビューイメージ'
                />
              </div>
              ) : (
                <span>🌀Loading...</span>
              )
            }
          </div>
        </motion.div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export { HoverCard }