import { useState } from 'react'
import { Card, Title, Flex, Button, SelectBox, SelectBoxItem } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'

interface Props {
  siteList: PSIDataType[]
  onSiteSelect(value: string, selectedDate: string): void
  //onSiteSelect(value: string): void
}

export default function PsiSelectBox({ siteList, onSiteSelect }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedSiteMetrics, setSelectedSiteMetrics] = useState<PSIMetrics[]>([])
  const [selectedSiteId, setSelectedSiteId] = useState<string>('')

  const handleSelectChange = (value: string) => {
    const selectedSite = siteList.find((site) => site.id.toString() === value)

    if (selectedSite) {
      const metrics = selectedSite.siteMetrics.map((metrics) => metrics)
      setSelectedSiteMetrics(metrics)
      setSelectedSiteId(value)
    }

    setSelectedDate('')
    onSiteSelect(value, '')
  }

  const handleDateSelectChange = (value: string) => {
    setSelectedDate(value)
    onSiteSelect(selectedSiteId, value)

    const selectedSite = siteList.find((site) => site.id.toString() === selectedSiteId)

    if (selectedSite) {
      const metrics = selectedSite.siteMetrics.map((metrics) => metrics)
      setSelectedSiteMetrics(metrics)
    }
  }

  return (
    <div className="flex w-full gap-x-4">
      <SelectBox className="w-full" placeholder="サイトを選択してください" onValueChange={handleSelectChange}>
        {siteList.map((site) => (
          <SelectBoxItem
            key={site.id}
            text={site.name}
            value={site.id.toString()}
            icon={site.device === 'mobile' ? DevicePhoneMobileIcon : ComputerDesktopIcon}
          />
        ))}
      </SelectBox>

      <SelectBox
        className="w-full"
        placeholder="日付を選択してください"
        onValueChange={handleDateSelectChange}
        disabled={selectedSiteMetrics.length === 0}
      >
        {selectedSiteMetrics.map((siteMetric, index) => (
          <SelectBoxItem key={index} text={formatDate(siteMetric.createdAt)} value={siteMetric.createdAt} />
        ))}
      </SelectBox>
    </div>
  )
}


