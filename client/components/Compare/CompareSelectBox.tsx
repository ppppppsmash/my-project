'use client'

import { useState } from 'react'
import { SelectBox, SelectBoxItem } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import CursorArea from '@/components/LayoutComponents/CursorArea'

interface Props {
  siteList: PSIDataType[]
  onSiteSelect(value: string, selectedDate: string): void
}

export default function CompareSelectBox({ siteList, onSiteSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSiteMetrics, setSelectedSiteMetrics] = useState<PSIMetrics[]>([])
  const [selectedSiteId, setSelectedSiteId] = useState<string>('')

  const handleSelectChange = (value: string) => {
    const selectedSite = siteList.find((site) => site.id.toString() === value)

    if (selectedSite) {
      setSelectedSiteId(value)
      setSelectedSiteMetrics(selectedSite.siteMetrics)
      const result = selectedSite.siteMetrics.map((metrics, index) => {
        return metrics
      })
      return result
    }
  }

  const handleDateSelectChange = (value: string) => {
    setSelectedDate(value)
    onSiteSelect(selectedSiteId, value)
  }

  return (
    <div className='flex w-full gap-x-4'>
      <CursorArea>
        <div
          className='w-full'
          data-cursor='block'
        >
          <SelectBox className='w-full' placeholder='サイトを選択してください' onValueChange={handleSelectChange}>
            {siteList.map((site) => (
              <SelectBoxItem
                key={site.id}
                text={site.name}
                value={site.id.toString()}
                icon={site.device === 'mobile' ? DevicePhoneMobileIcon : ComputerDesktopIcon}
              />
            ))}
          </SelectBox>
        </div>
      </CursorArea>

      <CursorArea>
        <div
          className='w-full'
          data-cursor='block'
        >
          <SelectBox
            className='w-full'
            placeholder='日付を選択してください'
            onValueChange={handleDateSelectChange}
            disabled={selectedSiteMetrics.length === 0}
          >
            {selectedSiteMetrics.map((siteMetric, index) => (
              <SelectBoxItem key={index} text={formatDate(siteMetric.createdAt)} value={siteMetric.createdAt} />
            ))}
          </SelectBox>
        </div>
      </CursorArea>
    </div>
  )
}
