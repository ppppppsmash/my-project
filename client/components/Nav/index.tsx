'use client'
import { useState, useRef, useEffect, FC } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
// https://react-icons.github.io/react-icons/icons?name=ai
import Logo from '@/components/Logo'
import { IconType } from 'react-icons'
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'

interface Props {
  navItems: {
    label: string
    href: string
    icon: IconType
  }[]
}

const NAV_OPEN_WIDTH = 'w-60'
const NAV_CLOSE_WIDTH = 'w-12'
const NAV_VISIBILITY = 'nav-visibility'

const Nav: FC<Props> = ({navItems}): JSX.Element => {
  const navRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  const pathname = usePathname()

  const toggleNav = (visibility: boolean) => {
    const { current: currentNav } = navRef
    if(!currentNav) return

    const { classList } = currentNav
    if(visibility) {
      // navを隠す
      classList.remove(NAV_OPEN_WIDTH)
      classList.add(NAV_CLOSE_WIDTH)
    } else {
      classList.add(NAV_OPEN_WIDTH)
      classList.remove(NAV_CLOSE_WIDTH)
    }

  }

  const updateNavState = () => {
    toggleNav(visible)
    const newState = !visible
    setVisible(newState)
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState))
  }

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY)
    if(navState !== null) {
      const newState = JSON.parse(navState)
      setVisible(newState)
      toggleNav(!newState)
    } else {
      setVisible(true)
    }
  }, [])

  return (
    <nav ref={navRef} className='h-screen overflow-hidden w-60 top-0 sticky shadow-sm flex flex-col
    justify-between transition-[width] bg-secondary text-white'>
      <div>
        <Link href='/'>
          <div className='flex items-top space-x-2 p-3 mb-10'>
            <Logo className='fill-highlight-light w-5 h-5' />
            {visible && <span className='font-semibold leading-none'>Page Speed Insights Measurement</span>}
          </div>
        </Link>

        <div className='space-y-6'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex items-center text-xl hover:scale-[0.9]
                transition p-3 ${pathname === item.href && 'bg-black'}`
              }>
                <item.icon size={24} />
                {visible && <span className='ml-2 leading-none'>{item.label}</span>}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <button onClick={updateNavState} className='text-highlight-light p-3 hover:scale-[0.9] transition self-end'>
        {visible ? <RiMenuFoldFill size={25} /> : <RiMenuUnfoldFill size={25} />}
      </button>
    </nav>
  )
}

export default Nav