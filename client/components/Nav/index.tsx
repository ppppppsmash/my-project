import { FC } from 'react'
import Link from 'next/link'
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
    <nav className='h-screen w-60 shadow-sm flex flex-col justify-between
    transition-[width] bg-secondary'>
      <div>
        <Link href='/'>
          <div className='flex items-center space-x-2 p-3 mb-10'>
            <Logo className='fill-highlight-light' />
            <span>Page Speed Insights</span>
          </div>
        </Link>

        <div className='space-y-6'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className='flex items-center text-xl hover:scale-[0.9]
                transition'>
                <item.icon size={24} />
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Nav