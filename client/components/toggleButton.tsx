'use client'
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ToggleButton() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true)
      document.querySelector('html')?.classList.add('dark')
    } else {
      setDarkMode(false)
      document.querySelector('html')?.classList.remove('dark')
    }
  }, [darkMode])

  const handleChangeDarkMode = () => {
    if (darkMode) {
      localStorage.theme = 'light'
      setDarkMode(false)
    } else {
      localStorage.theme = 'dark'
      setDarkMode(true)
    }
  }

  return (
    <div className='absolute top-5 sm:right-2 right-10'>
      <Switch.Group>
        <div className='flex items-center'>
          <Switch
            name='toggle'
            checked={darkMode}
            onChange={handleChangeDarkMode}
            className={`${
              darkMode ? 'bg-gray-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
          >
            <SunIcon
              className='w-4 h-4 absolute left-1 text-yellow-200'
            />
            <MoonIcon
              className='w-4 h-4 absolute right-1 text-blue-500'
            />
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'toggle-label translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </div>
  )
}
