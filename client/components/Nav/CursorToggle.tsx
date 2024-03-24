'use client'

import { CursorArrowRaysIcon, CursorArrowRippleIcon } from '@heroicons/react/24/solid'
import { useCursorContext } from '@/components/ConText/CursorContext'

export default function CursorToggle() {
  const { coolCursor, setCoolCursor } = useCursorContext() as { coolCursor: boolean; setCoolCursor: React.Dispatch<React.SetStateAction<boolean>> }

  return (
    <button
      onClick={() => setCoolCursor(!coolCursor)}
      className='flex items-center gap-x-2 cursor-pointer hover:scale-[1.2] transition duration-300'
    >
      { !coolCursor ? (
        <CursorArrowRaysIcon className='w-6 h-6' />
        ) : (
        <CursorArrowRippleIcon className='w-6 h-6' />
      )}
    </button>
  )
}