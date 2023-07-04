import { FC } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavItemProps {
  label: string
  link: string
}

interface Props {
  navItems: {
    label: string
    link: string
    children?: NavItemProps[]
  }[]
}

const BreadCrumbs: FC<Props> = ({ navItems }): JSX.Element => {
  const pathname = usePathname()

  const items = navItems.filter((navItem) => {
    if(navItem.link === pathname) {
      return true
    }
  })

  const subItems = navItems.map((item) => {
    if(item.children) return item.children
  })

  return (
    <div className=''>
      <ol className='flex font-bold overflow-x-auto whitespace-nowrap pl-4 py-2' aria-label='breadcrumb'>
        {items.map((item, index) => (
          <li className='flex items-center' key={index}>
            <>
              <Link className='text-gray-900 underline text-[6px]' href={item.link}>{item.label}</Link>
              <FaChevronRight aria-hidden='true' className='text-[6px] mx-2'/>
            </>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BreadCrumbs