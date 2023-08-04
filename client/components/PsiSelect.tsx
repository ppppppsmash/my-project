import { SelectBox, SelectBoxItem } from '@tremor/react'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Props {
  placeholder: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function PsiSelect({ placeholder, handleChange }: Props) {
  return (
    <div className='max-w-sm space-y-6'>
      <SelectBox
        onValueChange={(value) => console.log('値：', value)}
        defaultValue='1'
      >
        <SelectBoxItem value='9' text='9:00' icon={ClockIcon} />
        <SelectBoxItem value='10' text='10:00' icon={ClockIcon} />
        <SelectBoxItem value='11' text='11:00' icon={ClockIcon} />
        <SelectBoxItem value='12' text='12:00' icon={ClockIcon} />
      </SelectBox>
    </div>
  )
}
