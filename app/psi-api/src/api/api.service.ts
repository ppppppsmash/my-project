import { Injectable } from '@nestjs/common'
import { site_list_db } from '../entities/api.entity'
 import { Repository } from 'typeorm'
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

}
