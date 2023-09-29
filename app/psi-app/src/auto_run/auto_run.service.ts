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
        user_fcp: loadingExperienceAudits['FIRST_CONTENTFUL_PAINT_MS'],
        user_lcp: loadingExperienceAudits['LARGEST_CONTENTFUL_PAINT_MS'],
        user_fid: loadingExperienceAudits['FIRST_INPUT_DELAY_MS'],
        user_cls: loadingExperienceAudits['CUMULATIVE_LAYOUT_SHIFT_SCORE'],
        user_inp: loadingExperienceAudits['EXPERIMENTAL_INTERACTION_TO_NEXT_PAINT'],
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
  private stopCronJob(name: string) {
    const job = this.jobs[name]
    if (job) {
      job.stop()
      this.logger.warn(`Cron job for ${name} has been stopped.`)
    }
  }

  private addCronJob(name: string, schedule: string, url: string, device: string, id: number) {
    const jobName = `${name}-${uuidv4()}`
    const job = new CronJob(`${schedule} * * * * *`, () => this.executeJob(name, url, device, id))

    // 以前のジョブが存在する場合は停止してから新しいジョブを追加
    this.stopCronJob(jobName)

    this.schedulerRegistry.addCronJob(jobName, job)
    job.start()

    this.logger.warn(`Job ${name} added for each minute at ${schedule} seconds!`)

    this.jobs[jobName] = job
  }

  @Cron('0 0 9 * * *', {
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

        if (schedule === '0') {
          this.stopCronJob(name)
          console.log(name)
        } else {
          this.addCronJob(name, schedule, url, device, id)
          console.log(name)
        }
      })

      return data
    } catch (error) {
      console.error('Error fetching schedule data:', error.message)
      return null
    }
  }

   // async getScheduleAuto() {
  //   const datas = await this.findAll()
  //   for(const data of datas) {
  //     const {schedule} = data
  //     return schedule
  //   }
  // }

//   async cronAuto() {
//     const datas = await this.findAll()
//     try {
//       for (const data of datas) {
//         const { id, name, url, device, schedule } = data
//         const result = await this.psiService.fetchData(url, device)
//         const { lighthouseResult, loadingExperience } = result
//         const { categories } = lighthouseResult
//         const { performance } = categories
//         const score = performance.score * 100
//         const { audits: lighthouseResultAudits } = lighthouseResult
//         const lighthouseResultMetrics = {
//           lcp: lighthouseResultAudits['largest-contentful-paint'],
//           fid: lighthouseResultAudits['max-potential-fid'],
//           cls: lighthouseResultAudits['cumulative-layout-shift'],
//           fcp: lighthouseResultAudits['first-contentful-paint'],
//           fci: lighthouseResultAudits['first-cpu-idle'],
//           eil: lighthouseResultAudits['estimated-input-latency'],
//           fmp: lighthouseResultAudits['first-meaningful-paint'],
//           tti: lighthouseResultAudits['interactive'],
//           tbt: lighthouseResultAudits['total-blocking-time'],
//           tbf: lighthouseResultAudits['time-to-first-byte'],
//           si: lighthouseResultAudits['speed-index']
//         }
//         const { metrics: loadingExperienceAudits } = loadingExperience
//         const psiData = {
//           url,
//           score,
//           schedule,
//           lcp: lighthouseResultMetrics.lcp.displayValue,
//           fid: lighthouseResultMetrics.fid.displayValue,
//           cls: lighthouseResultMetrics.cls.displayValue,
//           fcp: lighthouseResultMetrics.fcp.displayValue,
//           tbt: lighthouseResultMetrics.tbt.displayValue,
//           si: lighthouseResultMetrics.si.displayValue,
//           device
//         }
//         await this.patch(id, psiData)
//         await this.addCronJob(name, schedule)
//         await this.deleteCron(name)
//         console.log(schedule)

//         console.log('データを自動で取得し、patch処理を自動で更新しました')
//       }
//     } catch (error) {
//       console.error('データの取得や更新時にエラーが発生しました', error)
//     }
// }


// async testCron() {
//   const job = new CronJob('2 * * * * *', () => {
//     this.logger.log('My cron running...')
//   })

//   this.schedulerRegistry.addCronJob('sec', job)
//   job.start()
// }
  // async onModuleInit() {
  //   await this.cronAuto()
  // //  await this.getCrons()
  // }

  // async addCronJob(name: string, schedule: string) {
  //   const job = new CronJob(`* ${schedule} * * * *`, async () => {
  //     this.logger.debug(`job ${name} が ${schedule} 分ごとで動く！！！`)
  //     await this.cronAuto()
  //   })
  //   this.schedulerRegistry.addCronJob(name, job)
  //   job.start()
  //   this.logger.debug(`job ${name} が ${schedule} 分ごとで動く！！！`)
  //   job.stop()
  // }

  // async deleteCron(name: string) {
  //   this.schedulerRegistry.deleteCronJob(name)
  //   this.logger.warn(`job ${name} deleted!`)
  // }

  // async getCrons() {
  //   const jobs = this.schedulerRegistry.getCronJobs()
  //   jobs.forEach((value, key, map) => {
  //     let next;
  //     try {
  //       next = value.nextDates().toJSDate()
  //     } catch (e) {
  //       next = 'error: '
  //     }
  //     this.logger.log(`job: ${key} -> next: ${next}`)
  //   })
  // }
}