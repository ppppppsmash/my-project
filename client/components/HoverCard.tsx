import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { clsx } from 'clsx'
import React, { useState } from 'react'
import { fetchLinkPreview } from '@/utils/getLinkPreview'

const { Root, Trigger, Portal } = HoverCardPrimitive

interface HoverCardProps {}

const HoverCard = ({children, url}: {children: React.ReactNode, url: string}) => {
  const [imageUrl, setImageUrl] = useState('')

  const getImage = async () => {
    const fetchImage = await fetchLinkPreview(url)
    setImageUrl(fetchImage.image)
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
          'max-w-md rounded-lg p-4 md:w-full',
          'bg-white dark:bg-gray-800',
          'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
        )}
      >
        <HoverCardPrimitive.Arrow className='fill-current text-white dark:text-gray-800' />

        <div className='flex h-full w-full space-x-4'>
          <img
            src={imageUrl}
            width={200}
            height={100}
            alt='test'
          />
        </div>
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Root>
  );
};

export { HoverCard }