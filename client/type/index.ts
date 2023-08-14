export interface PSIDataType {
  id: number
  device: string
  name: string
  url: string
  schedule?: string
  createdAt: string
  updatedAt: string
  siteMetrics: PSIMetrics[]
}

export interface PSIMetrics {
  id: number
  name: string
  url: string
  score: number
  lcp?: any
  fid?: any
  cls?: any
  fcp?: any
  tbt?: any
  si?: any
  site_list_id: number
  createdAt: string
  updatedAt: string
}

export interface pageList {
  name: string
  url: string
  label: string
  score: string
  date: string
}

export interface Month {
  label: string
  days: number
}