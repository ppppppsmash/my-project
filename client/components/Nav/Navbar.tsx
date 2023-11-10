'use client'
import Link from 'next/link'
import { useState, useCallback, MouseEvent } from 'react'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Bars3Icon, XMarkIcon, CommandLineIcon } from '@heroicons/react/24/outline'
import { TbDeviceAnalytics } from 'react-icons/tb'
import ToggleButton from '@/components/ToggleButton'
import { inter } from '@/utils/font'

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: 'ページ登録', href: '/list/add' },
  { name: 'ページ一覧', href: '/list' },
  { name: 'ページ比較', href: '/compare' }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
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

  return (
    <Disclosure as="nav" className="fixed w-full z-50 top-0 bg-white shadow dark:bg-gray-950 dark:text-white dark:border-b-[1px] dark:border-slate-700">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-4 md:px-16">

            <div className="absolute sm:top-5 top-4">
              <Link className='flex items-center gap-x-2' href='/'>
                <TbDeviceAnalytics className="block h-8 w-8 text-gray-900 dark:text-white" />
                <span className={`${inter.className}`}>PSI Measurement</span>
              </Link>
            </div>

            <div className="relative flex h-16 md:justify-center md:mr-0 justify-end">
              <div className="flex">
                <div
                  className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'
                  onMouseMove={handleMouseMove}
                >
                  {navigation.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => handleNavItemClick(item.href)} // クリック時にcurrentNavItemを更新
                      className='relative border-transparent text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300
                      inline-flex items-center px-1 pt-1 text-[12px] font-medium'
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
                  ))}
                </div>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2
                  text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2
                  focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <ToggleButton />
            </div>

          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
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
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
