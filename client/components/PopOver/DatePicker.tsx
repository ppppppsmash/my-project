'use client'

import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/cn'
import { Button } from '@/components/Button/ShadcnButton'
import { Calendar } from '@/components/PopOver/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/PopOver/PopOverButton'

interface DatePickerProps {
  selectedDate?: Date | undefined
  onSelectDate: (date: Date | undefined) => void
}

export function DatePicker({ selectedDate, onSelectDate }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate)
  console.log(date)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex justify-end'>
          <Button
            variant={'outline'}
            className={cn(
              'w-[280px] justify-start text-left font-normal mb-6',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>日付を選んでください.</span>}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={(newDate) => {
            setDate(newDate)
            onSelectDate(newDate || undefined)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
