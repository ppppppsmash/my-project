import { PSIMetrics } from "@/type"
import { formatDate } from "./formatDate"

export function metricsFormatter(data: PSIMetrics[]): PSIMetrics[] {
    return data.map((item: PSIMetrics) => ({
      id: item.id,
      name: item.name,
      url: item.url,
      score: item.score,
      lcp: (item.lcp?.replace(/,/g, '').split(/\s/)[0]),
      tti: (item.tti?.replace(/,/g, '').split(/\s/)[0]),
      cls: (item.cls?.replace(/,/g, '').split(/\s/)[0]),
      fcp: (item.fcp?.replace(/,/g, '').split(/\s/)[0]),
      tbt: (item.tbt?.replace(/,/g, '').split(/\s/)[0]),
      si: (item.si?.replace(/,/g, '').split(/\s/)[0]),
      user_fcp: item.user_fcp,
      user_lcp: item.user_lcp,
      user_fid: item.user_fid,
      user_cls: item.user_cls,
      user_inp: item.user_inp,
      user_ttfb: item.user_ttfb,
      createdAt: formatDate(item.createdAt),
      updatedAt: formatDate(item.updatedAt)
    }))
  }
