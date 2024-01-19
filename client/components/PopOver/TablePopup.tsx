import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { PencilSquareIcon, XMarkIcon, ArrowPathIcon, EllipsisHorizontalIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface ActionItem {
  name: string
  isRequired: boolean
  icon: () => JSX.Element
}

interface Props {
  behaviorEdit(): void
  behaviorScoreAgain(): void
  behaviorDelete(): void
  className: string
}

const iconEdit = () => {
  return (
    <PencilSquareIcon />
  )
}

const iconScore = () => {
  return (
    <SparklesIcon />
  )
}

const iconScoreAgain = () => {
  return (
    <ArrowPathIcon />
  )
}

const iconDelete = () => {
  return (
    <XMarkIcon />
  )
}

const actions: ActionItem[] = [
  {
    name: '編集',
    isRequired: true,
    icon: iconEdit
  },
  {
    name: '取得',
    isRequired: true,
    icon: iconScore
  },
  {
    name: '再取得',
    isRequired: true,
    icon: iconScoreAgain
  },
  {
    name: '削除',
    isRequired: true,
    icon: iconDelete
  },
]

export default function TablePopup({ behaviorEdit, behaviorScoreAgain, behaviorDelete, className }: Props) {
  const handleClick = (action: string) => {
    if(action === '編集') {
      behaviorEdit()
    } else if (action === '再取得') {
      behaviorScoreAgain()
    } else if(action === '削除') {
      behaviorDelete()
    }
  }
  return (
    <Menu as='div' className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={`
              ${open ? 'bg-gray-100 dark:bg-gray-700 rounded' : 'text-opacity-90'}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <EllipsisHorizontalIcon
              className='block h-6 w-6 cursor-pointer'
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Menu.Item as='div' className={`absolute ${className} z-50 mt-3 max-w-sm -translate-x-1/2
              transform px-4 sm:px-0 lg:max-w-xl cursor-pointer`}>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative block bg-white py-4'>
                  {actions.map((item) => (
                    item.isRequired &&
                    <a
                      key={item.name}
                      className='mx-1 flex items-center rounded-lg p-2 transition duration-150 ease-in-out
                        hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500
                        focus-visible:ring-opacity-50'
                      onClick={()=>handleClick(item.name)}
                    >
                      <div className="w-4 h-4 mr-2 dark:text-gray-950">
                        <item.icon aria-hidden="true" />
                      </div>
                      <p className='text-sm font-medium text-gray-900'>
                        {item.name}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </Menu.Item>
          </Transition>
        </>
      )}
    </Menu>
  )
}
