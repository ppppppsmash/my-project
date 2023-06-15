import { FC } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'

interface NavItemProps {
  label: string
  href: string
}

interface Props {
  navItems: {
    label: string
    href: string
    children: NavItemProps
  }[]
}

const BreadCrumbs: FC<Props> = ({ navItems }): JSX.Element => {
  const pathname = usePathname()

  const items = navItems.filter((navItem) => {
    if(navItem.href === pathname) {
      return true
    }
  })

  console.log(items)

  return (
    <ol className='flex font-bold overflow-x-auto whitespace-nowrap' aria-label='breadcrumb'>
      {items.map((item, index) => (
          <li className='flex items-center' key={index}>
            {navItems.length - 1 !== index
              ?
              <>
                <a className='text-gray-900 text-sm md:text-base underline' href={item.href}>{item.label}</a>
                <FaChevronRight aria-hidden='true' className='text-xs mx-2'/>
              </>
              : <span className='text-sm md:text-base' aria-current='page'>{item.label}</span>
            }
          </li>
      ))}
    </ol>
  )
}

export default BreadCrumbs