import { Injectable } from '@nestjs/common'
import { UserHistory } from '../entities/user_history.entity'
import { Repository, InsertResult, UpdateResult, DeleteResult, EntityManager } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UserHistoryService {

    constructor(
      @InjectRepository(UserHistory)
      private readonly userHistoryRepository: Repository<UserHistory>
    ) {}

    async getUserHistory(user_id: number): Promise<UserHistory[]> {
      const userHistory = await this.userHistoryRepository.find({ where: { user_id } })
      return userHistory
    }

    async postUserHistory(UserHistory): Promise<any> {
      await this.userHistoryRepository.save(UserHistory)
      // const userHistory = new UserHistory()

      // return this.userHistoryRepository.save(userHistory)

    }
}
