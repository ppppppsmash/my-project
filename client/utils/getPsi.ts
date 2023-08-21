import { postData, patchData } from '@/utils/fetchData'
import { urlValidate } from '@/utils/validation'
import { sendSlackAlert } from './slackAlert'

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
  const psiSiteListArray = []
  const psiSiteMetricsArray = []

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

      const psiSiteMetircs = {
        score,
        name,
        url,
        lcp: lighthouseResultMetrics.lcp.displayValue,
        fid: lighthouseResultMetrics.fid.displayValue,
        cls: lighthouseResultMetrics.cls.displayValue,
        fcp: lighthouseResultMetrics.fcp.displayValue,
        tbt: lighthouseResultMetrics.tbt.displayValue,
        si: lighthouseResultMetrics.si.displayValue,
      }

      const psiSiteList = {
        name,
        url: urlValidate(url),
        schedule,
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      psiSiteListArray.push(psiSiteList)

      if (score < 70) {
        const message = `登録した ${name}-(${device}) のスコアが70未満です。 スコア: ${score}`
        await sendSlackAlert(message)
      }

    }
  }

  for (const psiSite of psiSiteListArray) {
    await postData('psi_site_list', psiSite)
  }

 redirectTo(redirect)
}

export const getPsiDataAgain = async (name: string, url: string, index: number, id: number, device: string) => {
  const psiDataArray = []
  const res = await fetchPsiData(url, device)

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult } = result
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

      const psiSiteMetircs = {
        name,
        url,
        score,
        lcp: lighthouseResultMetrics.lcp.displayValue,
        fid: lighthouseResultMetrics.fid.displayValue,
        cls: lighthouseResultMetrics.cls.displayValue,
        fcp: lighthouseResultMetrics.fcp.displayValue,
        tbt: lighthouseResultMetrics.tbt.displayValue,
        si: lighthouseResultMetrics.si.displayValue,
      }

      const psiSiteList = {
        url: urlValidate(url),
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      psiDataArray.push(psiSiteList)

      if (score < 70) {
        const message = `${name}-(${device}) は再取得したスコアが70未満です。 スコア: ${score}`
        await sendSlackAlert(message)
      }

      psiDataArray.map(async (psiData) => {
        await patchData('psi_site_list', id, psiData)
      })
    }
}