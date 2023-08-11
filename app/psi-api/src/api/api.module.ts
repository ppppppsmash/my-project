import { Module } from '@nestjs/common'
import { ApiService } from './api.service'
import { ApiController } from './api.controller'
import { site_list } from '../entities/api.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PsiService } from 'src/psi/psi.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    TypeOrmModule.forFeature([site_list]),
    ScheduleModule.forRoot()
  ],
  providers: [ApiService, PsiService],
  controllers: [ApiController]
})
export class ApiModule {}
