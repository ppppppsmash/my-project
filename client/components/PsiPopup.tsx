import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { PencilSquareIcon, XMarkIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

const iconEdit = () => {
  return (
    <PencilSquareIcon />
  )
}

const iconDelete = () => {
  return (
    <XMarkIcon />
  )
}

const actions = [
  {
    name: 'Edit',
    icon: iconEdit
  },
  {
    name: 'Delete',
    icon: iconDelete
  },
]

export default function PsiPopup() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? '' : 'text-opacity-90'}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <EllipsisHorizontalIcon
              className='block h-6 w-6 cursor-pointer'
            />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className='absolute top-2 left-5 z-10 mt-3 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl w-[100px]'>
              <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                <div className='relative block bg-white py-4'>
                  {actions.map((item) => (
                    <a
                      key={item.name}
                      href=''
                      className='mx-1 flex items-center rounded-lg p-2 transition duration-150 ease-in-out
                        hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500
                        focus-visible:ring-opacity-50'
                    >
                      <div className="w-4 h-4 mr-2">
                        <item.icon aria-hidden="true" />
                      </div>
                      <p className='text-sm font-medium text-gray-900'>
                        {item.name}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
