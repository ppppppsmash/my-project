import { Injectable, Logger, SetMetadata } from '@nestjs/common'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AutoRunService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(AutoRunService.name)

  private readonly jobs: { [name: string]: CronJob } = {}

  private async executeJob(name: string, url: string, device: string, id: number) {
    this.logger.debug(`Executing cron job for ${name}`)

    try {
      this.logger.debug('実行するよ！')
      const psiUrl = 'http://localhost:3000/psi'
      const { data } = await axios.get(`${psiUrl}?url=${url}&strategy=${device}`)

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
        cls: lighthouseResultAudits?.['cumulative-layout-shift'],
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
        name,
        url,
        device,
        siteMetrics: [
          psiSiteMetircs
        ]
      }

      console.log(psiSiteList)
      // PATCHリクエストを送信して psi_site_list を更新
      await axios.patch(`http://localhost:3000/psi_site_list/${id}`, psiSiteList)

    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
    }
  }

  private getNextValidDate(schedule: string): Date {
    return new Date(Date.now() + parseInt(schedule)*60*60*1000)
  }

  // cron jobを停止するメソッド
  // private stopCronJob(name: string) {
  //   const job = this.jobs[name]
  //   if (job) {
  //     job.stop()
  //     this.logger.warn(`Cron job for ${name} has been stopped.`)
  //   }
  // }

  // private addCronJob(name: string, schedule: string, url: string, device: string, id: number) {
  //   const jobName = `${name}-${uuidv4()}`
  //   const job = new CronJob(`* * */${schedule} * * *`, () => this.executeJob(name, url, device, id))

  //   // 以前のジョブが存在する場合は停止してから新しいジョブを追加
  //   this.stopCronJob(jobName)

  //   this.schedulerRegistry.addCronJob(jobName, job)
  //   job.start()

  //   this.logger.warn(`サイト名 ${name} のcronjob値は ${schedule}`)

  //   this.jobs[jobName] = job
  // }

  // @Cron('* * 18 * * *', {
  //   timeZone: 'Asia/Tokyo',
  // })
  // async handleCron() {
  //   this.logger.debug('Called when the second is 0')

  //   try {
  //     const url = 'http://localhost:3000/psi_site_list' // 既存のエンドポイントのURL
  //     const { data } = await axios.get(url)

  //     // dataが配列であることを確認してからscheduleを取得
  //     data.map(({ name, schedule, url, device, id }) => {
  //       // 次回のcron jobの実行時刻をログに出力
  //       const nextExecutionTime = this.getNextValidDate(schedule)
  //       this.logger.debug(
  //         `Next execution time for ${name}, schedule: ${schedule}: ${nextExecutionTime.toISOString()}`,
  //       )

  //       if (schedule === '0') {
  //         this.stopCronJob(name)
  //         console.log(name)
  //       } else {
  //         this.addCronJob(name, schedule, url, device, id)
  //         console.log(name)
  //       }
  //     })

  //     return data
  //   } catch (error) {
  //     console.error('Error fetching schedule data:', error.message)
  //     return null
  //   }
  // }

}