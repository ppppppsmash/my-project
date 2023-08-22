import { List, ListItem } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Props {
  siteList: PSIDataType
}

export default function PsiCompareList({ siteList }: Props) {
  return (
    <List key={siteList.id}>
        <ListItem>
          <span>サイト：</span>
          <span>{siteList.name}</span>
        </ListItem>
        <ListItem>
          <span>URL：</span>
          <span>{siteList.url}</span>
        </ListItem>
        <ListItem>
          <span>デバイス：</span>
          <span>{siteList.device}</span>
        </ListItem>


          {siteList.siteMetrics.map((metrics) => (
            <>
              <ListItem>
                <span>スコア：</span>
                <span>{metrics.score}</span>
              </ListItem>
              <ListItem>
                <span>LCP：</span>
                <span>{metrics.lcp}</span>
              </ListItem>
              <ListItem>
                <span>FID：</span>
                <span>{metrics.fid}</span>
              </ListItem>
              <ListItem>
                <span>CLS：</span>
                <span>{metrics.cls}</span>
              </ListItem>
              <ListItem>
                <span>FCP：</span>
                <span>{metrics.fcp}</span>
              </ListItem>
              <ListItem>
                <span>TBT：</span>
                <span>{metrics.tbt}</span>
              </ListItem>
              <ListItem>
                <span>SI：</span>
                <span>{metrics.si}</span>
              </ListItem>
            </>
          ))}
    </List>
  )
}
