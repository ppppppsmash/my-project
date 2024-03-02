import { Injectable, Logger, SetMetadata } from '@nestjs/common'
import { Cron, Interval, SchedulerRegistry, CronExpression } from '@nestjs/schedule'
import { CronJob } from 'cron'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AutoRunService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(AutoRunService.name)

  onModuleInit() {
    this.getPSIAuto()
  }

  async getPSIAuto() {
    try {
      const url = 'http://127.0.0.1:3000/psi_site_list'
      const { data } = await axios.get(url)

      data.map(({ name, schedule, url, device, id }) => {
        this.logger.debug(
          `site: ${name}, schedule: ${schedule}`,
        )

        if (schedule !== '0' && schedule !== '24') {
          this.addCronJobHours(`cron job-${uuidv4()}`, `${schedule}`, name, url, device, id)
        } else if (schedule === '24') {
          this.addCronJobDay(`cron job-${uuidv4()}`, name, url, device, id)
        } else {
          console.error('no!')
        }
      })

      return data
    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
      return null
    }
  }

  private async getPsi(name: string, url: string, device: string, id: number) {
    this.logger.debug(`サイト${name} cronjob開始`)

    try {
      this.logger.debug('実行する')
      const psiUrl = 'http://127.0.0.1:3000/psi'
      const { data } = await axios.get(`${psiUrl}?url=${url}&strategy=${device}`)
      console.log(data)

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

      await axios.patch(`${process.env.API_BASE_URL}psi_site_list/${id}`, psiSiteList)

    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
    }
  }

  addCronJobHours(job_name: string, time: string, name: string, url: string, device: string, id: number) {
    const job = new CronJob(`0 0-23/${time} * * *`, async () => {
      await this.getPsi(name, url,device, id)
      this.logger.warn(`${time}時間ごとに ${job_name} を稼働する!`)
    })

    // job.addCallback(() => {
    //   // ジョブが終了した後に自動的にジョブを削除
    //   this.schedulerRegistry.deleteCronJob(job_name)
    //   this.logger.warn(`${job_name} は実行済みなのでクローズ`)
    // })

    this.schedulerRegistry.addCronJob(job_name, job)
    job.start()

    this.logger.warn(
      `${time}時間ごとに ${job_name} を稼働した.`
    )
  }

  addCronJobDay(job_name: string, name: string, url: string, device: string, id: number) {
    const job = new CronJob(`0 10 * * *`, async () => {
      await this.getPsi(name, url,device, id)
      this.logger.warn(`毎日10:00 ${job_name} を稼働する!`)
    })

    // job.addCallback(() => {
    //   this.schedulerRegistry.deleteCronJob(job_name)
    //   this.logger.warn(`${job_name} は実行済みなのでクローズ`)
    // })

    this.schedulerRegistry.addCronJob(job_name, job)
    job.start()

    this.logger.warn(
      `毎日10:00 ${job_name} を稼働した.`
    )
  }

  deleteCron(job_name: string) {
    this.schedulerRegistry.deleteCronJob(job_name)
    this.logger.warn(`job ${job_name} deleted!`)
  }
}
