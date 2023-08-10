import { postData, patchData } from '@/utils/fetchData'
import { urlValidate } from '@/utils/urlValidate'

const redirectTo = (url: any) => {
  window.location.href = url
}

const fetchPsiData = async (url: string, device: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}psi?url=${urlValidate(url)}&strategy=${device}`, {
    cache: 'no-store'
  })
  return res
}

export const getPsiData = async (selectedDevice: string[], name: string, url: string, schedule: string, redirect: string) => {
  const psiDataArray = []

  for (const device of selectedDevice) {
    const res = await fetchPsiData(url, device)

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult, loadingExperience } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits: lighthouseResultAudits } = lighthouseResult
      const lighthouseResultMetrics = {
        lcp: lighthouseResultAudits['largest-contentful-paint'],
        fid: lighthouseResultAudits['max-potential-fid'],
        cls: lighthouseResultAudits['cumulative-layout-shift'],
        fcp: lighthouseResultAudits['first-contentful-paint'],
        fci: lighthouseResultAudits['first-cpu-idle'],
        eil: lighthouseResultAudits['estimated-input-latency'],
        fmp: lighthouseResultAudits['first-meaningful-paint'],
        tti: lighthouseResultAudits['interactive'],
        tbt: lighthouseResultAudits['total-blocking-time'],
        tbf: lighthouseResultAudits['time-to-first-byte'],
        si: lighthouseResultAudits['speed-index']
      }

      const { metrics: loadingExperienceAudits } = loadingExperience
      const loadingExperienceMetrics = {
        CUMULATIVE_LAYOUT_SHIFT_SCORE: loadingExperienceAudits['CUMULATIVE_LAYOUT_SHIFT_SCORE']
      }

      const psiData = {
        name,
        url,
        score,
        schedule,
        lcp: lighthouseResultMetrics.lcp.displayValue,
        fid: lighthouseResultMetrics.fid.displayValue,
        cls: lighthouseResultMetrics.cls.displayValue,
        fcp: lighthouseResultMetrics.fcp.displayValue,
        tbt: lighthouseResultMetrics.tbt.displayValue,
        si: lighthouseResultMetrics.si.displayValue,
        device
      }
      psiDataArray.push(psiData)
      console.log(result)
    }
  }

    psiDataArray.map(async (psiData) => {
      const res = await postData('api', psiData)
    })

    redirectTo(redirect)
}

export const getPsiDataAgain = async (url: string, index: number, id: number, device: string) => {
  const psiDataArray = []
  const res = await fetchPsiData(url, device)

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits } = lighthouseResult
      const metrics = {
        lcp: audits['largest-contentful-paint'],
        fid: audits['first-input-delay'],
        cls: audits['cumulative-layout-shift'],
        fcp: audits['first-contentful-paint'],
        tbt: audits['total-blocking-time'],
        si: audits['speed-index'],
        fci: audits['first-cpu-idle'],
        eil: audits['estimated-input-latency'],
        fmp: audits['first-meaningful-paint'],
        tti: audits['interactive']
      }

      const psiData = {
        url,
        score,
        fcp: metrics.fcp.displayValue,
        lcp: metrics.lcp.numericValue,
        device
      }

      psiDataArray.push(psiData)

      psiDataArray.map(async (psiData) => {
        await patchData('api', id, psiData)
      })
    }
}