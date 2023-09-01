import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SiteMetrics } from '../entities/site_metrics.entity'
import { SiteList } from '../entities/site_list.entity'
import { Repository, InsertResult, UpdateResult, DeleteResult, EntityManager, getRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class PsiSiteListService {

  private readonly logger = new Logger(PsiSiteListService.name)

  constructor(
    @InjectRepository(SiteList)
    private readonly pageRepository: Repository<SiteList>,

    @InjectRepository(SiteMetrics)
    private readonly metricsRepository: Repository<SiteMetrics>,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  async findAll(): Promise<SiteList[]> {
    return await this.pageRepository.find({
      relations: ['siteMetrics'],
      order: {
        id: 'DESC'
      },
      join: {
        alias: 'siteList',
        leftJoinAndSelect: {
          siteMetrics: 'siteList.siteMetrics',
        }
      }
    })
  }

  async find(id: number): Promise<SiteList | null> {
    console.log(id)
    return await this.pageRepository.findOne({
      where: { id },
      relations: ['siteMetrics']
    })
  }

  async create(SiteList): Promise<any> {
    const savedSiteList = await this.pageRepository.save(SiteList)
    const siteMetrics = SiteList.siteMetrics

    await Promise.all(siteMetrics.map(async (metric) => {
      metric.siteList = savedSiteList
      await this.metricsRepository.save(metric)
    }))
  }

  async patch(id: number, siteListData): Promise<any> {
    const savedSiteList = await this.pageRepository.findOne({ where: { id }, relations: ['siteMetrics'] })
    console.log(id)

    if (!savedSiteList) {
      throw new Error(`SiteList with ID ${id} not found`)
    }

    if (siteListData.name) {
      savedSiteList.name = siteListData.name
    }

    if (siteListData.schedule) {
      savedSiteList.schedule = siteListData.schedule
    }

    const siteMetrics = siteListData.siteMetrics

    if (siteMetrics && siteMetrics.length > 0) {
      for (const metric of siteMetrics) {
        metric.siteList = savedSiteList
        console.log(metric)
        await this.metricsRepository.save(metric)
      }
    }

    delete savedSiteList.siteMetrics
    await this.pageRepository.save(savedSiteList)

    return savedSiteList
  }

  async delete(id: number): Promise<void> {
    const siteList = await this.pageRepository.findOne({ where: { id }, relations: ['siteMetrics'] })
    for (const siteMetric of siteList.siteMetrics) {
      await this.metricsRepository.remove(siteMetric)
    }
    await this.pageRepository.delete(id)
  }

  async getScheduleAuto() {
    const datas = await this.findAll()
    for(const data of datas) {
      const {schedule} = data
      return schedule
    }
  }

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


async testCron() {
  const job = new CronJob('2 * * * * *', () => {
    this.logger.log('My cron running...')
  })

  this.schedulerRegistry.addCronJob('sec', job)
  job.start()
}
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