import { Module } from '@nestjs/common'
import { ApiService } from './api.service'
import { ApiController } from './api.controller'
import { site_list_db } from '../entities/api.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from '../data-source'

@Module({
  imports: [TypeOrmModule.forFeature([site_list_db])],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
