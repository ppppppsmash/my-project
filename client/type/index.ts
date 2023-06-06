export interface ApiResultType {
  name?: string
  url?: string
  date?: string
  score: string
  lcp?: string
  fcp?: string
}

export interface pageList {
  name: string
  url: string
  score: string
  date: string
}

export interface Month {
  label: string
  days: number
}