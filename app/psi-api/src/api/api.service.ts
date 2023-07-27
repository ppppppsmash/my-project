import { Injectable } from '@nestjs/common'
import { site_list_db } from '../entities/api.entity'
 import { Repository, InsertResult, UpdateResult, DeleteResult } from 'typeorm'
 import { InjectRepository } from '@nestjs/typeorm'

@Injectable()

export class ApiService {
  constructor(
    @InjectRepository(site_list_db)
    private readonly pageRepository: Repository<site_list_db>
  ) {}

  async findAll(): Promise<site_list_db[]> {
    return await this.pageRepository.find()
  }

  async find(id: number): Promise<site_list_db> | null {
    return await this.pageRepository.findOne({ where: { id } })
  }

  async create(site_list_db): Promise<InsertResult> {
    return await this.pageRepository.insert(site_list_db)
  }

  async patch(id: number, site_list_db): Promise<UpdateResult> {
    return await this.pageRepository.update(id, site_list_db)
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.pageRepository.delete(id)
  }
}
