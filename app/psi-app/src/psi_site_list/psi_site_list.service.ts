import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { SiteMetrics } from '../entities/site_metrics.entity'
import { SiteList } from '../entities/site_list.entity'
import { Repository, InsertResult, UpdateResult, DeleteResult, EntityManager } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PsiSiteListService {

  private readonly logger = new Logger(PsiSiteListService.name)

  constructor(
    @InjectRepository(SiteList)
    private readonly pageRepository: Repository<SiteList>,

    @InjectRepository(SiteMetrics)
    private readonly metricsRepository: Repository<SiteMetrics>,
    //private schedulerRegistry: SchedulerRegistry
  ) {}

  async findAll(): Promise<SiteList[]> {
    const date = new Date()
    date.setMonth(date.getMonth() - 3)

    return await this.pageRepository
      .createQueryBuilder('siteList')
      .leftJoinAndSelect('siteList.siteMetrics', 'siteMetrics')
      .orderBy('siteList.id', 'DESC')
      .addOrderBy('siteMetrics.id', 'DESC')
      .where('siteMetrics.updatedAt >= :date', { date })
      .getMany()
  }

  async find(id: number): Promise<SiteList | null> {
    console.log(id)
    return await this.pageRepository.findOne({
      where: { id },
      relations: ['siteMetrics']
    })
  }

  async create(SiteList): Promise<any> {
    await this.pageRepository.save(SiteList)
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

    if (siteListData.title) {
      savedSiteList.title = siteListData.title
    }

    if (siteListData.image) {
      savedSiteList.image = siteListData.image
    }

    if (siteListData.description) {
      savedSiteList.description = siteListData.description
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
}