import { Injectable } from '@nestjs/common'
import { site_list } from '../entities/api.entity'
 import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm'
 import { InjectRepository } from '@nestjs/typeorm'

@Injectable()

export class ApiService {
  constructor(
    @InjectRepository(site_list)
    private readonly pageRepository: Repository<site_list>
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
}
