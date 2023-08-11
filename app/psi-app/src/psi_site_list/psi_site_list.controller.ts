import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common'
import { PsiSiteListService } from './psi_site_list.service'
import { site_list } from '../entities/site_list.entity'
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm'

@Controller('psi_site_list')
export class PsiSiteListController {
  constructor(
    private readonly service: PsiSiteListService
  ) {}

  @Get()
  async getDataList(): Promise<site_list[]> {
    return await this.service.findAll()
  }

  @Get(':id')
  async getData(@Param('id') id: number): Promise<site_list> {
    console.log(id)
    return await this.service.find(id)
  }

  @Post()
  async addData(@Body() page): Promise<InsertResult> {
    return await this.service.create(page)
  }

  @Patch(':id')
  async patchData(@Param('id') id: number, @Body() page): Promise<UpdateResult> {
    return await this.service.patch(id, page)
  }

  @Delete(':id')
  async deleteData(@Param('id') id: number): Promise<DeleteResult> {
    return await this.service.delete(id)
  }

  @Get()
  async testCron(){
    return await this.service.testCron()
  }
}
