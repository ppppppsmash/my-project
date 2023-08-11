import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { site_list } from '../entities/site_list.entity'
import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { PsiService } from '../psi/psi.service'
import { CronJob } from 'cron'

@Injectable()
export class PsiSiteListService {
//export class PsiSiteListService implements OnModuleInit {

  private readonly logger = new Logger(PsiSiteListService.name)

  constructor(
    @InjectRepository(site_list)
    private readonly pageRepository: Repository<site_list>,
    private readonly psiService: PsiService,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  async findAll(): Promise<site_list[]> {
    return await this.pageRepository.find()
  }

  async find(id: number): Promise<site_list> | null {
    return await this.pageRepository.findOne({ where: { id } })
  }

  async create(site_list): Promise<InsertResult> {
    return await this.pageRepository.insert(site_list)
  }

  async patch(id: number, site_list): Promise<UpdateResult> {
    return await this.pageRepository.update(id, site_list)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.pageRepository.delete(id)
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