import { SelectBox, SelectBoxItem } from '@tremor/react'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Props {
  placeholder: string
  handleSelectChange: (value: string) => void
}

export default function PsiSelect({ placeholder, handleSelectChange }: Props) {
  return (
    <div className='max-w-sm space-y-6'>
      <SelectBox
        onValueChange={(value) => handleSelectChange(value)}
        defaultValue='0'
      >
        <SelectBoxItem value='0' text={placeholder} icon={ClockIcon} />
        <SelectBoxItem value='1' text='1時間ごと' icon={ClockIcon} />
        <SelectBoxItem value='2' text='2時間ごと' icon={ClockIcon} />
        <SelectBoxItem value='4' text='4時間ごと' icon={ClockIcon} />
        <SelectBoxItem value='12' text='12時間ごと' icon={ClockIcon} />
        <SelectBoxItem value='24' text='24時間ごと' icon={ClockIcon} />
        <SelectBoxItem value='week' text='1週間ごと' icon={ClockIcon} />
      </SelectBox>
    </div>
  )
}
