import { FC } from 'react'
import Link from 'next/link'
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
    <nav>
      <div>
        <Link href='/'>
          logo
        </Link>

        <div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div className='flex items-center'>
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