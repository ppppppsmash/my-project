import { List, ListItem } from '@tremor/react'
import { PSIDataType, PSIMetrics } from '@/type'

interface Props {
  siteList: PSIDataType
  compareResult: PSIMetrics
}

export default function PsiCompareList({ siteList, compareResult }: Props) {
  const metricsNewest = siteList.siteMetrics.slice().reverse()[0]
  const {
    score,
    lcp,
    fid,
    cls,
    fcp,
    tbt,
    si,
  } = compareResult

  return (
    <List key={siteList.id}>
      <ListItem>
        <span>サイト：</span>
        <span>{siteList.name}</span>
      </ListItem>
      <ListItem>
        <span>URL：</span>
        <span><a className='underline decoration-dotted' href={siteList.url} target='_blank'>{siteList.url}</a></span>
      </ListItem>
      <ListItem>
        <span>デバイス：</span>
        <span>{siteList.device}</span>
      </ListItem>

      {/* Metricsデータ */}
      <ListItem>
        <span>スコア：</span>
        <span className='flex'>{metricsNewest.score} {score}</span>
      </ListItem>
      <ListItem>
        <span>LCP：</span>
        <span className='flex'>{metricsNewest.lcp} {lcp}</span>
      </ListItem>
      <ListItem>
        <span>FID：</span>
        <span className='flex'>{metricsNewest.fid} {fid}</span>
      </ListItem>
      <ListItem>
        <span>CLS：</span>
        <span className='flex'>{metricsNewest.cls} {cls}</span>
      </ListItem>
      <ListItem>
        <span>FCP：</span>
        <span className='flex'>{metricsNewest.fcp} {fcp}</span>
      </ListItem>
      <ListItem>
        <span>TBT：</span>
        <span className='flex'>{metricsNewest.tbt} {tbt}</span>
      </ListItem>
      <ListItem>
        <span>SI：</span>
        <span className='flex'>{metricsNewest.si} {si}</span>
      </ListItem>
    </List>
  );
}
