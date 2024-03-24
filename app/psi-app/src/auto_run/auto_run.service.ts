import { Injectable, Logger, SetMetadata } from '@nestjs/common'
import { Cron, Interval, SchedulerRegistry, CronExpression } from '@nestjs/schedule'
import { v4 as uuidv4 } from 'uuid'
const schedule = require('node-schedule')

@Injectable()
export class AutoRunService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(AutoRunService.name)

  private psiLocks: Record<number, boolean> = {}

  // onModuleInit() {
  //   this.getPSIAuto()
  // }
  async getPSIAuto() {
    try {
      const url = `${process.env.API_BASE_URL}psi_site_list`
      const response = await fetch(url)
      const data = await response.json()

      const promises = data.map(async (site) => {
        const { name, schedule, url, device, id } = site

        if (schedule !== '0' && schedule !== '24') {
          return this.addCronJobHours(`${id}-${name}-${uuidv4()}`, schedule, name, url, device, id)
        } else if (schedule === '24') {
          return this.addCronJobDay(`${id}-${name}-${uuidv4()}`, name, url, device, id)
        } else {
          console.error('no schedule')
        }
      })

      await Promise.all(promises)
    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
      return null
    }
  }

  private async psiCronHandler(name: string, url: string, device: string, id: number) {
    if (this.psiLocks[id]) {
      this.logger.log(`CronJob for site ${name} (${url}-${device}) is locked. Skipping...`)
      return
    }

    this.psiLocks[id] = true
    await this.getPsi(name, url, device, id)
    this.psiLocks[id] = false
  }

  private async getPsi(name: string, url: string, device: string, id: number) {
    this.logger.warn(`サイト${name} cronjob開始`)

    try {
      this.logger.debug('実行する')
      const psiUrl = `${process.env.API_BASE_URL}psi`
      const response = await fetch(`${psiUrl}?url=${url}&strategy=${device}`)
      const data = await response.json()

      const { lighthouseResult, loadingExperience } = data
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
        cls: lighthouseResultAudits?.['cumulative-layout-shift']
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
        url,
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      // if (psiSiteMetircs.score < 50) {
      //   const message = `Cron Job: ${psiSiteMetircs.name}（${psiSiteMetircs.url}-${psiSiteList.device}）は${psiSiteMetircs.score}、改善してください`
      //   await this.sendSlackAlert(message)
      // }

      const res = await fetch(`${process.env.API_BASE_URL}psi_site_list/${id}`, {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...psiSiteList})
      })

      return res

    } catch (error) {
      console.error(`Error fetching schedule data: ${id}`, error.message)
    }
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs()
    jobs.forEach(async (value, key, map) => {
      let next
      try {
        next = value.nextDates().toJSDate()
      } catch (e) {
        next = 'error: next fire date is in the past!'
      }
      this.logger.log(`job: ${key} -> next: ${next}`)
      //await this.sendSlackAlert(`CronJob予定: ${key} -> next: ${next}`)
    })
  }

  private addCronJobHours(job_name: string, time: string, name: string, url: string, device: string, id: number) {
    schedule.scheduleJob(`0 */${time} * * *`, async () => {
      this.logger.warn(`${job_name} ${time}時間ごとに ${job_name} を稼働する!`)
      await this.psiCronHandler(name, url, device, id)
      //const message = `Cron Job: ${job_name}（${url}, device: ${device} PSIスコア取得済み。`
      //await this.sendSlackAlert(message)
    })

    // this.schedulerRegistry.addCronJob(job_name, job)
    // job.start()

    // this.logger.warn(
    //   `${time}時間ごとに ${job_name} を稼働した.`
    // )
  }

  private addCronJobDay(job_name: string, name: string, url: string, device: string, id: number) {
    schedule.scheduleJob(`0 10 * * *`, async () => {
      this.logger.warn(`毎日10:00 ${job_name} を稼働する!`)
      await this.psiCronHandler(name, url, device, id)
    })
  }

  deleteCron(job_name: string) {
    this.schedulerRegistry.deleteCronJob(job_name)
    this.logger.warn(`job ${job_name} deleted!`)
  }

  async sendSlackAlert(message: string) {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK

    if (!slackWebhookUrl) {
      console.error('Slack Webhook URL not set.')
      return
    }

    const payload = {
      text: message
    }

    try {
      const response = await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      console.log(response)

      if (response.ok) {
        console.log('Slack message sent successfully.')
      } else {
        console.error('Error sending Slack message:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error sending Slack message:', error.message, error)
    }
  }

  // @Cron('5 * * * * *')
  // async handleCron() {
  //   await this.sendSlackAlert('CronJob発動!')
  // }


  //https://hooks.slack.com/services/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
  // async sendSlackAlert( message: string ) {
  //   const payload = {
  //     text: message
  //   }

  //   var data = JSON.stringify(payload)

  //   //オプション情報設定
  //   var  options = {
  //       hostname: 'hooks.slack.com',
  //       port: 443,
  //       path: '/services/T0GHK1W5R/B05CM1KRAAE/2CG1UWcGXDzc4VdEB4YJvZIu',
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           'Content-Length': Buffer.byteLength(data)
  //       }
  //   }

  //   //リクエスト
  //   var req = https.request(options, (res) =>{
  //       if(res.statusCode===200){
  //           console.log("OK:"+res.statusCode)
  //       }else{
  //           console.log("Status Error:"+res.statusCode)
  //       }
  //   })

  //   //そもそもなエラー時
  //   req.on('error',(e)=>{
  //       console.error(e)
  //   })

  //   //データ送信
  //   req.write(data)
  //   //終わり
  //   req.end()
  // }
}