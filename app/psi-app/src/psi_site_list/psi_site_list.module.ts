import { Module } from '@nestjs/common'
import { PsiSiteListService } from './psi_site_list.service'
import { PsiSiteListController } from './psi_site_list.controller'
import { site_list } from '../entities/site_list.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PsiService } from '../psi/psi.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    TypeOrmModule.forFeature([site_list]),
    ScheduleModule.forRoot()
  ],
  providers: [PsiSiteListService, PsiService],
  controllers: [PsiSiteListController]
})
export class PsiSiteListModule {}
