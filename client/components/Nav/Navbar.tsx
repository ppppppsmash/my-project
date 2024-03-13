'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback, MouseEvent, Fragment } from 'react'
import { usePathname } from 'next/navigation'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { TbDeviceAnalytics } from 'react-icons/tb'
import { ModeToggle } from '@/components/Nav/ModeToggle'
import { inter } from '@/utils/font'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Notice from '@/components/Alert/Notice'
import CursorArea from '@/components/LayoutComponents/CursorArea'

const navigation = [
  { name: '履歴一覧', href: '/' },
  { name: 'ページ登録', href: '/list/add' },
  { name: 'ページ一覧', href: '/list' },
  { name: 'ページ比較', href: '/compare' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [currentNavItem, setCurrentNavItem] = useState(pathname)
  const handleNavItemClick = (href: string) => {
    setCurrentNavItem(href)
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)

  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }: MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - bounds.left)
      mouseY.set(clientY - bounds.top)
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
    }, [mouseX, mouseY, radius]
  )

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`

  const onLogOut = async () => {
    const result = await signOut({
      callbackUrl: '/signin'
    })
  }

  return (
    <Disclosure as='nav' className='fixed w-full z-50 top-0 bg-white shadow dark:bg-gray-950 dark:text-white dark:border-b-[1px] dark:border-slate-700'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-full px-4 md:px-16'>

            <div className='absolute sm:top-5 top-4 z-50'>
              <Link className='flex items-center gap-x-2' href='/'>
                <TbDeviceAnalytics className='block h-8 w-8 text-gray-900 dark:text-white' />
                <span className={`${inter.className}`}>PSI Measurement</span>
              </Link>
            </div>

            <div className='relative flex h-16 md:justify-center md:mr-0 justify-end'>
              <div className='flex'>
                <div
                  className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'
                  onMouseMove={handleMouseMove}
                >
                  {navigation.map((item, index) => (
                    <CursorArea key={index}>
                      <a
                        data-cursor='block'
                        key={index}
                        href={item.href}
                        onClick={() => handleNavItemClick(item.href)}
                        className={`relative duration-300 border-transparent text-gray-500 dark:text-white
                          inline-flex items-center px-1 pt-1 text-[12px] font-thin hover:scale-[1.1]
                          ${item.href === currentNavItem ? 'transition duration-150 text-[13px] bg-gradient-to-r from-teal-300 via-sky-500 to-indigo-600 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200dark:to-sky-400' : ''}`}
                        aria-current={pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                        {item.href === currentNavItem &&
                        <motion.span
                          className='absolute inset-x-1 -bottom-px h-px bg-gradient-to-r border-slate-500 dark:border-white text-gray-900 dark:text-white border-b-2'
                          layoutId='active-nav-item'
                        />
                      }
                      </a>
                    </CursorArea>
                  ))}
                </div>

                <div className='hidden sm:ml-6 sm:flex sm:items-center absolute z-50 right-2 top-4'>
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'>
                        <span className='sr-only'>Open user menu</span>
                        <Image
                          className='h-8 w-8 rounded-full'
                          src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
                          height={32}
                          width={32}
                          alt={`${session?.user?.name || 'placeholder'} avatar`}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-[13rem] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <>
                                <div className='flex items-center break-all px-2'>
                                  <div className=''>
                                    <div className='text-base font-medium text-gray-800'>
                                      {session?.user.name}
                                    </div>
                                    <div className='text-sm font-medium text-gray-500'>
                                      {session?.user.email}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'flex w-full mt-2 px-1 py-2 text-sm text-gray-700 hover:bg-gray-800 hover:text-white border-gray-800 rounded-md transition duration-500'
                                  )}
                                  onClick={() => onLogOut()}
                                >
                                  <span className='flex items-center gap-x-2'>
                                    <ArrowLeftOnRectangleIcon className='w-6 h-6' />
                                    ログアウト
                                  </span>
                                </button>
                              </>
                            )}
                          </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className='-mr-2 flex items-center sm:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-white p-2
                  text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2
                  focus:ring-slate-500 focus:ring-offset-2'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>

              <Notice />

              <CursorArea>
                <div
                  className='absolute top-3 sm:right-16 right-10'
                  data-cursor='block'
                >
                  <ModeToggle />
                </div>
              </CursorArea>
            </div>

          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 pt-2 pb-3'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className='border-t border-gray-200 pt-4 pb-3'>
              {session?.user &&
                <>
                  <div className='flex items-center px-4'>
                    <div className='flex-shrink-0'>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src={session?.user?.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`avatar`}
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-gray-800'>
                        {session?.user.name}
                      </div>
                      <div className='text-sm font-medium text-gray-500'>
                        {session?.user.email}
                      </div>
                    </div>
                  </div>
                  <div className='mt-3 space-y-1'>
                    <button
                      onClick={() => signOut()}
                      className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                    >
                      ログアウト
                    </button>
                  </div>
                </>
                }
              </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
