'use client'
import {
  Card,
  Title,
  Flex,
  Button,
  SelectBox,
  SelectBoxItem
} from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import {
  DocumentTextIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline"

interface Props {
  siteList: PSIDataType[]
  onSiteSelect(value: string): void
}

export default function PsiSelectBox({ siteList, onSiteSelect }: Props) {
  const handleSelectChange = (value: string) => {
    const selectedSite = siteList.find(site => site.name === value)
    if (selectedSite) {
      const result = selectedSite.siteMetrics.map((metrics, index) => {
        console.log(metrics)
        return metrics
      })
      return result
    }
  }

  return (
    <>
      <SelectBox
        placeholder='サイトを選択してください'
        onValueChange={onSiteSelect}
      >
        {siteList.map((site, index) => (
          <SelectBoxItem
            key={site.id}
            text={site.device + ' - ' + site.name}
            value={(site.id).toString()}
            icon={site.device === 'mobile' ? DevicePhoneMobileIcon : ComputerDesktopIcon}
          >
          </SelectBoxItem>
        ))}
      </SelectBox>
    </>
  )
}
