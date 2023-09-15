import { Injectable, Logger, SetMetadata } from '@nestjs/common'
import { Cron, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AutoRunService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(AutoRunService.name)

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

  async createDynamicCronJob(name: string, schedule: string, url: string, device: string, id: number) {
    const jobName = `${name}-${uuidv4()}`
    const cronExpression = `*/${schedule} * * * *` // 例: scheduleが10の場合は、毎分10秒ごとに実行

    if (this.schedulerRegistry.getCronJob(jobName)) {
      this.logger.warn(`Cron job for ${name} already exists.`)
      return
    }

    const job = new CronJob(cronExpression, () => this.executeJob(name, url, device, id))
    this.schedulerRegistry.addCronJob(jobName, job)

    this.logger.debug(`Scheduled cron job for ${name} (${schedule})`)
    job.start()
  }

  addCronJob(name: string, schedule: string, url: string, device: string, id: number) {
    const jobName = `${name}-${uuidv4()}`
    const job = new CronJob(`${schedule} * * * * *`, () => this.executeJob(name, url, device, id))

    this.schedulerRegistry.addCronJob(jobName, job)
    job.start()

    this.logger.warn(
      `job ${name} added for each minute at ${schedule} seconds!`,
    )
  }

  @Cron('0 28 16 * * *', {
    timeZone: 'Asia/Tokyo',
  })
  async handleCron() {
    this.logger.debug('Called when the second is 0')

    try {
      const url = 'http://localhost:3000/psi_site_list' // 既存のエンドポイントのURL
      const { data } = await axios.get(url)

      // dataが配列であることを確認してからscheduleを取得
      data.map(({ name, schedule, url, device, id }) => {
        // 次回のcron jobの実行時刻をログに出力
        const nextExecutionTime = this.getNextValidDate(schedule)
        this.logger.debug(
          `Next execution time for ${name}, schedule: ${schedule}: ${nextExecutionTime.toISOString()}`,
        )

        // ジョブを動的にスケジュールする
        this.addCronJob(name, schedule, url, device, id)
      })

      return data
    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
      return null
    }
  }
}