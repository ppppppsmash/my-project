import { postData, patchData } from '@/utils/fetchData'
import { urlValidate } from '@/utils/validation'
import { sendSlackAlert } from './slackAlert'

const TOTAL_PROGRESS = 100

const fetchPsiData = async (url: string, device: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}psi?url=${urlValidate(url)}&strategy=${device}`, {
    cache: 'no-store'
  })
  return res
}

export const getPsiData = async (selectedDevice: string[], name: string, url: string, schedule: string, userId: number, userName: string, progressCallback: (progress: number) => void) => {
  let currentProgress = 0

  for (const device of selectedDevice) {
    const res = await fetchPsiData(url, device)

    currentProgress++
    const progress = (currentProgress / TOTAL_PROGRESS) * 100

    if (res.ok) {
      const result = await res.json()
      const { lighthouseResult, loadingExperience } = result
      const { categories } = lighthouseResult
      const { performance } = categories
      const score = performance.score * 100

      const { audits: lighthouseResultAudits } = lighthouseResult

      const { metrics: loadingExperienceAudits } = loadingExperience
      const loadingExperienceMetrics = {
        user_fcp: loadingExperienceAudits?.['FIRST_CONTENTFUL_PAINT_MS'],
        user_lcp: loadingExperienceAudits?.['LARGEST_CONTENTFUL_PAINT_MS'],
        user_fid: loadingExperienceAudits?.['FIRST_INPUT_DELAY_MS'],
        user_cls: loadingExperienceAudits?.['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
        user_inp: loadingExperienceAudits?.['INTERACTION_TO_NEXT_PAINT'],
        user_ttfb: loadingExperienceAudits?.['EXPERIMENTAL_TIME_TO_FIRST_BYTE'],
      }

      const lighthouseResultMetrics = {
        si: lighthouseResultAudits?.['speed-index'],
        fcp: lighthouseResultAudits?.['first-contentful-paint'],
        lcp: lighthouseResultAudits?.['largest-contentful-paint'],
        tti: lighthouseResultAudits?.['interactive'],
        tbt: lighthouseResultAudits?.['total-blocking-time'],
        cls: lighthouseResultAudits?.['cumulative-layout-shift'],
      }

      const psiSiteMetircs = {
        score,
        name,
        url,
        lcp: lighthouseResultMetrics?.lcp?.displayValue,
        tti: lighthouseResultMetrics?.tti?.displayValue,
        cls: lighthouseResultMetrics?.cls?.displayValue,
        fcp: lighthouseResultMetrics?.fcp?.displayValue,
        tbt: lighthouseResultMetrics?.tbt?.displayValue,
        si: lighthouseResultMetrics?.si?.displayValue,
        user_fcp: loadingExperienceMetrics?.user_fcp?.percentile,
        user_lcp: loadingExperienceMetrics?.user_lcp?.percentile,
        user_fid: loadingExperienceMetrics?.user_fid?.percentile,
        user_cls: loadingExperienceMetrics?.user_cls?.percentile,
        user_inp: loadingExperienceMetrics?.user_inp?.percentile,
        user_ttfb: loadingExperienceMetrics?.user_ttfb?.percentile
      }

      const psiSiteList = {
        name,
        url: urlValidate(url),
        schedule,
        device,
        user_id: userId,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      const historyAction = {
        action: 'PSIスコアを初めて取得しました',
        user_id: userId,
        site_name: psiSiteList.name,
        site_url: urlValidate(url),
        device
      }

      if (score < 70) {
        const message = `${name}（${urlValidate(url)}, device: ${device}) から取得したスコア: ${score}`

        if (userName) {
          const messageWithUser = `${userName} さんからのメッセージ:\n${message}`
        //  alert(messageWithUser)
          //await sendSlackAlert(messageWithUser)
        } else {
          //alert(messageWithUser)
          //await sendSlackAlert(message)
        }
      }

      await postData('user_history', historyAction)
      await postData('psi_site_list', psiSiteList)

    }

    progressCallback(TOTAL_PROGRESS)
  }
}

export const getPsiDataAgain = async (name: string, url: string, index: number, id: number, device: string, userId: number, userName: string) => {
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
        user_fcp: loadingExperienceAudits?.['FIRST_CONTENTFUL_PAINT_MS'],
        user_lcp: loadingExperienceAudits?.['LARGEST_CONTENTFUL_PAINT_MS'],
        user_fid: loadingExperienceAudits?.['FIRST_INPUT_DELAY_MS'],
        user_cls: loadingExperienceAudits?.['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
        user_inp: loadingExperienceAudits?.['INTERACTION_TO_NEXT_PAINT'],
        user_ttfb: loadingExperienceAudits?.['EXPERIMENTAL_TIME_TO_FIRST_BYTE']
      }

      const lighthouseResultMetrics = {
        si: lighthouseResultAudits?.['speed-index'],
        fcp: lighthouseResultAudits?.['first-contentful-paint'],
        lcp: lighthouseResultAudits?.['largest-contentful-paint'],
        tti: lighthouseResultAudits?.['interactive'],
        tbt: lighthouseResultAudits?.['total-blocking-time'],
        cls: lighthouseResultAudits?.['cumulative-layout-shift'],
      }

      const psiSiteMetircs = {
        score,
        name,
        url,
        lcp: lighthouseResultMetrics?.lcp?.displayValue,
        tti: lighthouseResultMetrics?.tti?.displayValue,
        cls: lighthouseResultMetrics?.cls?.displayValue,
        fcp: lighthouseResultMetrics?.fcp?.displayValue,
        tbt: lighthouseResultMetrics?.tbt?.displayValue,
        si: lighthouseResultMetrics?.si?.displayValue,
        user_fcp: loadingExperienceMetrics?.user_fcp?.percentile,
        user_lcp: loadingExperienceMetrics?.user_lcp?.percentile,
        user_fid: loadingExperienceMetrics?.user_fid?.percentile,
        user_cls: loadingExperienceMetrics?.user_cls?.percentile,
        user_inp: loadingExperienceMetrics?.user_inp?.percentile,
        user_ttfb: loadingExperienceMetrics?.user_ttfb?.percentile
      }

      const psiSiteList = {
        url: urlValidate(url),
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      // const historyAction = {
      //   action: 'スコアを取得した',
      //   user_id: userId,
      //   site_name: psiSiteMetircs.name,
      //   site_url: urlValidate(psiSiteMetircs.url),
      //   device
      // }

      if (score < 70) {
        const message = `${name}（${urlValidate(url)}, device: ${device}) から再取得したスコア: ${score}`

        const messageWithUser = `${userName} さんからのメッセージ:\n${message}`
        //alert(messageWithUser)
        //await sendSlackAlert(messageWithUser)
      }
      //await postData('user_history', historyAction)
      await patchData('psi_site_list', id, psiSiteList)
    }
}