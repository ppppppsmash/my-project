import { FC } from 'react'
import Link from 'next/link'
// https://react-icons.github.io/react-icons/icons?name=ai
import Logo from '@/components/Logo'
import { IconType } from 'react-icons'

interface Props {
  navItems: {
    label: string
    href: string
    icon: IconType
  }[]
}

const Nav: FC<Props> = ({navItems}): JSX.Element => {
  return (
    <nav className='h-screen overflow-hidden w-60 top-0 sticky shadow-sm flex flex-col
    justify-between transition-[width] bg-secondary text-white'>
      <div>
        <Link href='/'>
          <div className='flex items-top space-x-2 p-3 mb-10'>
            <Logo className='fill-highlight-light w-5 h-5' />
            <span className='font-semibold leading-none'>Page Speed Insights Measurement</span>
          </div>
        </Link>

        <div className='space-y-6'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className='flex items-center text-xl hover:scale-[0.9]
                transition p-3'>
                <item.icon size={24} />
                <span className='ml-2 leading-none active:'>{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav