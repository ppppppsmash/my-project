import { FC } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItemProps {
  label: string
  href: string
}

interface Props {
  navItems: {
    label: string
    href: string
    children?: NavItemProps[]
  }[]
}

const BreadCrumbs: FC<Props> = ({ navItems }): JSX.Element => {
  const pathname = usePathname()

  const items = navItems.filter((navItem) => {
    if(navItem.href === pathname) {
      return true
    }
  })

  const subItems = navItems.map((item) => {
    if(item.children) return item.children
  })

  return (
    <div>
      <ol className='flex font-bold overflow-x-auto whitespace-nowrap' aria-label='breadcrumb'>
        {items.map((item, index) => (
          <li className='flex items-center' key={index}>
            <>
              <Link className='text-gray-900 text-sm md:text-base underline' href={item.href}>{item.label}</Link>
              <FaChevronRight aria-hidden='true' className='text-xs mx-2'/>
            </>
          </li>
        ))}
        {/* {subItems.map((subItem) => (
          <span>{subItem.label}</span>
        ))} */}
      </ol>
    </div>
  )
}

export default BreadCrumbs