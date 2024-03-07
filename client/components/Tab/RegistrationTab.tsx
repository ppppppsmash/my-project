'use client'

import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import PsiTabContent from '@/components/PsiTabContent'

interface Props {
  _name(value: any): void
  _url(value: any): void
  _title(value: any): void
  _description(value: any): void
  _image(value: any): void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RegistrationTab({ _name, _url, _title, _description, _image }: Props) {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleNameChange = (newValue: any) => {
    _name(newValue)
  }

  const handleUrlChange = (newValue: any) => {
    _url(newValue)
  }

  const handleTitleChange = (newValue: any) => {
    _title(newValue)
  }

  const handleDescriptionChange = (newValue: any) => {
    _description(newValue)
  }

  const handleImageChange = (newValue: any) => {
    _image(newValue)
  }

  let [categories] = useState({
    '単体登録': [
      {
        mode: 'single',
      }
    ],
    '複数登録': [
      {
        mode: 'multiple',
      },
    ],
    'CSV登録': [
      {
        mode: 'csv',
      },
    ]
  })

  return (
    <div className='w-full max-w py-2 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-gray-800/[.04] p-1 dark:bg-gray-100 dark:text-white'>
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
            classNames(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-900 dark:text-gray-950',
              'ring-white ring-opacity-40 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-1',
            selected
              ? 'bg-white shadow dark:bg-gray-950 dark:text-white'
              : 'text-blue-100 hover:text-gray-500 hover:bg-white dark:hover:bg-gray-300 dark:bg-white dark:text-gray-950'
            )
          }
          >
            {category}
          </Tab>
        ))}
        </Tab.List>
        <Tab.Panels className='mt-2'>
        {Object.values(categories).map((posts, index) => (
          <Tab.Panel key={index}>
            { selectedTab === 0 &&
              <PsiTabContent
                mode={posts[0].mode}
                _name={handleNameChange}
                _url={handleUrlChange}
                _title={handleTitleChange}
                _description={handleDescriptionChange}
                _image={handleImageChange}
              />
            }
          </Tab.Panel>
        ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
