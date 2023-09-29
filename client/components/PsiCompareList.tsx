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
  //selectedDate: string
}

export default function PsiCompareList({ siteList, compareResult }: Props) {
//  const metricsForSelectedDate = siteList.siteMetrics.find((metrics) => metrics.createdAt === selectedDate)
//const metricsNewest = metricsForSelectedDate || (siteList.siteMetrics.length > 0 ? siteList.siteMetrics[0] : null)
  const metricsNewest = siteList.siteMetrics[0]

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
    <List key={siteList.id}>
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


      <ListItem>
        <span>取得時間：</span>
        <span className="flex">{formatDate(metricsNewest.updatedAt)}</span>
      </ListItem>

      <ListItem>
        <span>Score:</span>
        <span className='flex'>{metricsNewest.score} {score}</span>
      </ListItem>
      <ListItem>
        <span>First Contentful Paint:</span>
        <span className='flex'>{metricsNewest.fcp} {fcp}</span>
      </ListItem>
      <ListItem>
        <span>Largest Contentful Paint:</span>
        <span className='flex'>{metricsNewest.lcp} {lcp}</span>
      </ListItem>
      <ListItem>
        <span>Time to Interactive:</span>
        <span className='flex'>{metricsNewest.tti} {tti}</span>
      </ListItem>
      <ListItem>
        <span>Total Blocking Time:</span>
        <span className='flex'>{metricsNewest.tbt} {tbt}</span>
      </ListItem>
      <ListItem>
        <span>Cumulative Layout Shift:</span>
        <span className='flex'>{metricsNewest.cls} {cls}</span>
      </ListItem>
      <ListItem>
        <span>Speed Index:</span>
        <span className='flex'>{metricsNewest.si} {si}</span>
      </ListItem>

      <ListItem>
        <span>（User）First Contentful Paint:</span>
        <span className='flex'>{metricsNewest.user_fcp / 1000} s {user_lcp}</span>
      </ListItem>
      <ListItem>
        <span>（User）Largest Contentful Paint:</span>
        <span className='flex'>{metricsNewest.user_lcp / 1000} s {user_lcp}</span>
      </ListItem>
      <ListItem>
        <span>（User）First Input Delay:</span>
        <span className='flex'>{metricsNewest.user_fid} ms {user_fid}</span>
      </ListItem>
      <ListItem>
        <span>（User）Cumulative Layout Shif:</span>
        <span className='flex'>{metricsNewest.user_cls} {user_cls}</span>
      </ListItem>
      <ListItem>
        <span>（User）Interaction to Next Paint:</span>
        <span className='flex'>{metricsNewest.user_inp / 1000} s {user_inp}</span>
      </ListItem>
      <ListItem>
        <span>（User）Time to First Byte:</span>
        <span className='flex'>{metricsNewest.user_ttfb / 1000} s {user_ttfb}</span>
      </ListItem>

    </List>
  )
}
