import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common'
import { PsiSiteListService } from './psi_site_list.service'
import { SiteList } from '../entities/site_list.entity'
import { InsertResult, UpdateResult, DeleteResult, Transaction, EntityManager } from 'typeorm'

@Controller('psi_site_list')
export class PsiSiteListController {
  constructor(
    private readonly psiSiteListService: PsiSiteListService
  ) {}

  @Get()
  async getDataList(): Promise<SiteList[]> {
    return await this.psiSiteListService.findAll()
  }

  @Get(':id')
  async getData(@Param('id') id: number): Promise<SiteList> {
    console.log(id)
    return await this.psiSiteListService.find(id)
  }

  @Post()
  async addData(@Body() page): Promise<any> {
    return await this.psiSiteListService.create(page)
  }

  @Patch(':id')
  async patchData(@Param('id') id: number, @Body() page): Promise<UpdateResult> {
    return await this.psiSiteListService.patch(id, page)
  }

  @Delete(':id')
  async deleteData(@Param('id') id: number): Promise<DeleteResult> {
    return await this.psiSiteListService.delete(id)
  }

  @Get()
  async testCron(){
    return await this.psiSiteListService.testCron()
  }
}
