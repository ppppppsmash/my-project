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
  lcp?: string
  tti?: string
  cls?: string
  fcp?: string
  tbt?: string
  si?: string
  user_fcp: number
  user_lcp: number
  user_fid: number
  user_cls: number
  user_inp: number
  user_ttfb: number
  createdAt: string
  updatedAt: string
}

export interface UserHistory {
  id: number
  user_id: number
  action: string
  action_date: string
  site_name: string
  site_url: string
}

export interface pageList {
  name: string
  url: string
  label: string
  score: string
  date: string
}

export interface SortType {
  name: string
  schedule: string
  createdAt: string
  score: string
}