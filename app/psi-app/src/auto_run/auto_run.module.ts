import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AutoRunService } from './auto_run.service'
import { AutoRunController } from './auto_run.controller'
import { PsiSiteListModule } from '../psi_site_list/psi_site_list.module'

@Module({
  imports: [
    PsiSiteListModule
  ],
  providers: [
    AutoRunService,
  ],
  controllers: [
    AutoRunController
  ]
})

export class AutoRunModule {}