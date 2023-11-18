'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { urlValidate } from '@/utils/validation'
import { RxCross2 } from 'react-icons/rx'

interface Props {
  onOpen(): void
  onClose(): void
  getPsiData(id: number, userId: number, userName: string, progressCallback: (progress: number) => void): void
  id: number,
  userId: number,
  userName: string,
  name: string | string[]
  url: string
}

export default function Modals({ onClose, getPsiData, id, userId, userName, name, url }: Props) {
  let [isOpen, setIsOpen] = useState(true)
  const [progress, setProgress] = useState<number>(0)

  function closeModal() {
    setIsOpen(false)
  }

  const handleClick = () => {
    getPsiData(id, userId, userName, setProgress)
    onClose()
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    サイトを登録しますか？
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {typeof name === 'string' ? (
                        <p>
                          サイト名: {name} <br/>
                          URL: {urlValidate(url)}
                        </p>
                      ) : (
                        name.map((x, index) => (
                          <div key={index}>
                            サイト名: {x.split(/\s+/)[0]} <br />
                            {x.split(/\s+/)[1] && `URL: ${urlValidate(x.split(/\s+/)[1])}`}
                          </div>
                        ))
                      ) }
                    </p>
                  </div>

                  <div className='flex pt-8 items-center justify-end px-6 py-3 -mx-6 -mb-4 sm:space-y-0 sm:space-x-6 sm:flex-row'>
                    <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm
                      font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2"
                    onClick={()=>onClose()}
                    >
                    いいえ
                    </button>

                    <button
                    type="button"
                    className="inline-flex justify-center rounded-md border transition text-white hover:text-gray-900 border-transparent bg-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={handleClick}
                    >
                    はい
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}