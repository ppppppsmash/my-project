import { useState } from 'react'
import { Switch } from '@headlessui/react'

interface Props {
    className: string
}

export default function ToggleButton({className}: Props) {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className={className}>
      <Switch.Group>
        <div className='flex items-center'>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${
              enabled ? 'bg-gray-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <span
              className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </div>
  )
}
