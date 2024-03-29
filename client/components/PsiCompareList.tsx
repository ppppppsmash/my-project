import { List, ListItem } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import {
  DevicePhoneMobileIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

interface Props {
  siteList: PSIDataType
  compareResult: PSIMetrics
  selectedDate: string
}

export default function PsiCompareList({ siteList, compareResult, selectedDate }: Props) {
  const metricsForSelectedDate = siteList.siteMetrics.find((metrics) => metrics.createdAt === selectedDate)
  const metricsNewest = metricsForSelectedDate || (siteList.siteMetrics.length > 0 ? siteList.siteMetrics[0] : null)

  const {
    score,
    lcp,
    tti,
    cls,
    fcp,
    tbt,
    si,
    user_fcp,
    user_lcp,
    user_fid,
    user_cls,
    user_inp,
    user_ttfb
  } = compareResult

  return (
    <List key={siteList.id} className='dark:text-white'>
      <ListItem>
        <span>サイト：</span>
        <Link href={{pathname: `/list/${siteList.id}`}}>
          <span className='flex gap-1 items-center underline decoration-dotted'>
            {siteList.name}
            <ArrowTopRightOnSquareIcon className='w-4 h-4' />
          </span>
        </Link>
      </ListItem>
      <ListItem>
        <span>URL:</span>
        <a className='underline decoration-dotted' href={siteList.url} target='_blank'>
          <span className='flex gap-1 items-center'>
            {siteList.url}
            <ArrowTopRightOnSquareIcon className='w-4 h-4' />
          </span>
        </a>
      </ListItem>
      <ListItem>
        <span>デバイス：</span>
        {siteList.device === 'mobile' ? (
          <span>
            <DevicePhoneMobileIcon className='w-5 h-5' />
          </span>
        ) : (
          <ComputerDesktopIcon className='w-5 h-5' />
        )}
      </ListItem>


      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.2s' }}
      >
        <span>取得時間：</span>
        <span className="flex">{metricsNewest && formatDate(metricsNewest.updatedAt)}</span>
      </ListItem>

      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.3s' }}
      >
        <span>Score:</span>
        <span className='flex'>{metricsNewest && metricsNewest.score} {score}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.4s' }}
      >
        <span>First Contentful Paint:</span>
        <span className='flex'>{metricsNewest && metricsNewest.fcp} {fcp}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.5s' }}
      >
        <span>Largest Contentful Paint:</span>
        <span className='flex'>{metricsNewest && metricsNewest.lcp} {lcp}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.6s' }}
      >
        <span>Time to Interactive:</span>
        <span className='flex'>{metricsNewest && metricsNewest.tti} {tti}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.7s' }}
      >
        <span>Total Blocking Time:</span>
        <span className='flex'>{metricsNewest && metricsNewest.tbt} {tbt}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.8s' }}
      >
        <span>Cumulative Layout Shift:</span>
        <span className='flex'>{metricsNewest && metricsNewest.cls} {cls}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '1.9s' }}
      >
        <span>Speed Index:</span>
        <span className='flex'>{metricsNewest && metricsNewest.si} {si}</span>
      </ListItem>

      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.0s' }}
      >
        <span>（User）First Contentful Paint:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_fcp / 1000} s {user_lcp}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.1s' }}
      >
        <span>（User）Largest Contentful Paint:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_lcp / 1000} s {user_lcp}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.2s' }}
      >
        <span>（User）First Input Delay:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_fid} ms {user_fid}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.3s' }}
      >
        <span>（User）Cumulative Layout Shif:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_cls} {user_cls}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.4s' }}
      >
        <span>（User）Interaction to Next Paint:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_inp / 1000} s {user_inp}</span>
      </ListItem>
      <ListItem
        className='opacity-0 translate-y-10 animate-slide-in'
        style={{ animationDelay: '2.5s' }}
      >
        <span>（User）Time to First Byte:</span>
        <span className='flex'>{metricsNewest && metricsNewest.user_ttfb / 1000} s {user_ttfb}</span>
      </ListItem>

    </List>
  )
}