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
  for (const device of selectedDevice) {
    const res = await fetchPsiData(url, device)

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult, loadingExperience } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits: lighthouseResultAudits } = lighthouseResult

      const { metrics: loadingExperienceAudits } = loadingExperience
      const loadingExperienceMetrics = {
        user_fcp: loadingExperienceAudits['FIRST_CONTENTFUL_PAINT_MS'],
        user_lcp: loadingExperienceAudits['LARGEST_CONTENTFUL_PAINT_MS'],
        user_fid: loadingExperienceAudits['FIRST_INPUT_DELAY_MS'],
        user_cls: loadingExperienceAudits['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
        user_inp: loadingExperienceAudits['INTERACTION_TO_NEXT_PAINT'],
        user_ttfb: loadingExperienceAudits['EXPERIMENTAL_TIME_TO_FIRST_BYTE']
      }

      const lighthouseResultMetrics = {
        si: lighthouseResultAudits['speed-index'],
        fcp: lighthouseResultAudits['first-contentful-paint'],
        lcp: lighthouseResultAudits['largest-contentful-paint'],
        tti: lighthouseResultAudits['interactive'],
        tbt: lighthouseResultAudits['total-blocking-time'],
        cls: lighthouseResultAudits['cumulative-layout-shift'],
      }

      const psiSiteMetircs = {
        score,
        name,
        url,
        lcp: lighthouseResultMetrics.lcp.displayValue,
        tti: lighthouseResultMetrics.tti.displayValue,
        cls: lighthouseResultMetrics.cls.displayValue,
        fcp: lighthouseResultMetrics.fcp.displayValue,
        tbt: lighthouseResultMetrics.tbt.displayValue,
        si: lighthouseResultMetrics.si.displayValue,
        user_fcp: loadingExperienceMetrics.user_fcp.percentile,
        user_lcp: loadingExperienceMetrics.user_lcp.percentile,
        user_fid: loadingExperienceMetrics.user_fid.percentile,
        user_cls: loadingExperienceMetrics.user_cls.percentile,
        user_inp: loadingExperienceMetrics.user_inp.percentile,
        user_ttfb: loadingExperienceMetrics.user_ttfb.percentile
      }

      console.log(psiSiteMetircs)

      const psiSiteList = {
        name,
        url: urlValidate(url),
        schedule,
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      if (score < 70) {
        const message = `CSVファイルで登録した ${name}（${urlValidate(url)}）--(${device}) のスコアが70未満です。 スコア: ${score}`
        //await sendSlackAlert(message)
        console.log(message)
      }

      await postData('psi_site_list', psiSiteList)

    }
  }
}

export const getPsiDataAgain = async (name: string, url: string, index: number, id: number, device: string) => {
  const res = await fetchPsiData(url, device)

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult, loadingExperience } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits: lighthouseResultAudits } = lighthouseResult

      const { metrics: loadingExperienceAudits } = loadingExperience
      const loadingExperienceMetrics = {
        user_fcp: loadingExperienceAudits['FIRST_CONTENTFUL_PAINT_MS'],
        user_lcp: loadingExperienceAudits['LARGEST_CONTENTFUL_PAINT_MS'],
        user_fid: loadingExperienceAudits['FIRST_INPUT_DELAY_MS'],
        user_cls: loadingExperienceAudits['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
        user_inp: loadingExperienceAudits['INTERACTION_TO_NEXT_PAINT'],
        user_ttfb: loadingExperienceAudits['EXPERIMENTAL_TIME_TO_FIRST_BYTE']
      }

      const lighthouseResultMetrics = {
        si: lighthouseResultAudits['speed-index'],
        fcp: lighthouseResultAudits['first-contentful-paint'],
        lcp: lighthouseResultAudits['largest-contentful-paint'],
        tti: lighthouseResultAudits['interactive'],
        tbt: lighthouseResultAudits['total-blocking-time'],
        cls: lighthouseResultAudits['cumulative-layout-shift'],
      }

      const psiSiteMetircs = {
        score,
        name,
        url,
        lcp: lighthouseResultMetrics.lcp.displayValue,
        tti: lighthouseResultMetrics.tti.displayValue,
        cls: lighthouseResultMetrics.cls.displayValue,
        fcp: lighthouseResultMetrics.fcp.displayValue,
        tbt: lighthouseResultMetrics.tbt.displayValue,
        si: lighthouseResultMetrics.si.displayValue,
        user_fcp: loadingExperienceMetrics.user_fcp.percentile,
        user_lcp: loadingExperienceMetrics.user_lcp.percentile,
        user_fid: loadingExperienceMetrics.user_fid.percentile,
        user_cls: loadingExperienceMetrics.user_cls.percentile,
        user_inp: loadingExperienceMetrics.user_inp.percentile,
        user_ttfb: loadingExperienceMetrics.user_ttfb.percentile
      }

      const psiSiteList = {
        url: urlValidate(url),
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      if (score < 70) {
        const message = `${name}-(${device}) は再取得したスコアが70未満です。 スコア: ${score}`
      //  await sendSlackAlert(message)
        alert(message)
      }

        await patchData('psi_site_list', id, psiSiteList)
    }
}