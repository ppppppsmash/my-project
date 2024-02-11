'use client'

import * as React from 'react'
import { useState } from 'react'
import { addDays, subDays, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/cn'
import { Button } from '@/components/Button/ShadcnButton'
import { Calendar } from '@/components/PopOver/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/PopOver/PopOverButton'

interface DatePickerProps {
  selectedDateFrom?: Date | undefined
  selectedDateTo?: Date | undefined
  onSelectDateFrom: any
  onSelectDateTo: any
  defaultMonth: any
}

export function DatePickerWithRange({
  selectedDateFrom, selectedDateTo, onSelectDateFrom, onSelectDateTo, defaultMonth
}: DatePickerProps) {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(selectedDateFrom)
  const [dateTo, setDateTo] = useState<Date | undefined>(selectedDateTo)

  const fromDate = dateFrom ? dateTo && subDays(dateTo, 30) : undefined

  const [date, setDate] = useState<any>({
    from: fromDate,
    to: dateTo,
  })

  const handleDateRangeChange = (newDateRange: any) => {
    onSelectDateFrom(newDateRange.from)
    onSelectDateTo(newDateRange.to)
  }

  console.log(defaultMonth)

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'y年M月dd日')} -{' '}
                  {format(date.to, 'y年M月dd日')}
                </>
              ) : (
                format(date.from, 'y年M月dd日')
              )
            ) : (
              <span>日付範囲を選んでください.</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={defaultMonth}
            selected={date}
            onSelect={
              (newDate) => {
                setDate(newDate)
                handleDateRangeChange(newDate)
              }
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
