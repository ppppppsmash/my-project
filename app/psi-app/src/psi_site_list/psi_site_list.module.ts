import { Module } from '@nestjs/common'
import { PsiSiteListService } from './psi_site_list.service'
import { PsiSiteListController } from './psi_site_list.controller'
import { SiteList } from '../entities/site_list.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { SiteMetrics } from 'src/entities/site_metrics.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteList, SiteMetrics]),
    ScheduleModule.forRoot()
  ],
  providers: [PsiSiteListService],
  controllers: [PsiSiteListController]
})
export class PsiSiteListModule {}
