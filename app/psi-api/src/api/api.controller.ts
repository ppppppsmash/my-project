import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiService } from './api.service'
 import { site_list_db } from '../entities/api.entity'


@Controller('api')
export class ApiController {
  constructor(private readonly service: ApiService) {}

  @Get()
  async getData(): Promise<site_list_db[]> {
    return await this.service.findAll()
  }
}
