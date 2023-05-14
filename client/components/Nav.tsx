import { FC } from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'

interface Props {
  navItems: {
    label: string
    href: string
    icon: IconType
  }
}

const Nav: FC<Props> = ({ navItem }): JSX.Element => {
  return (
    <nav>
      <div>
        <Link href='/'>
          logo
        </Link>

        <div>
        </div>
      </div>
    </nav>
  )
}

export default Nav