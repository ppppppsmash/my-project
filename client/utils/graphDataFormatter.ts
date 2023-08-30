import { PSIMetrics } from "@/type"
import { formatDate } from "./formatDate"

export function metricsFormatter(data: PSIMetrics[]): PSIMetrics[] {
    return data.map((item: PSIMetrics) => ({
      id: item.id,
      name: item.name,
      url: item.url,
      score: item.score,
      lcp: Number(item.lcp?.replace(/,/g, '').split(/\s/)[0]),
      fid: Number(item.fid?.replace(/,/g, '').split(/\s/)[0]) / 1000,
      cls: Number(item.cls?.replace(/,/g, '').split(/\s/)[0]),
      fcp: Number(item.fcp?.replace(/,/g, '').split(/\s/)[0]),
      tbt: Number(item.tbt?.replace(/,/g, '').split(/\s/)[0]),
      createdAt: formatDate(item.createdAt),
      updatedAt: formatDate(item.updatedAt)
    }))
  }