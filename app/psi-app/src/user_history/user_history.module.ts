import { Module } from '@nestjs/common'
import { UserHistoryController } from './user_history.controller'
import { UserHistoryService } from './user_history.service'
import { UserHistory } from '../entities/user_history.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHistory])
  ],
  controllers: [UserHistoryController],
  providers: [UserHistoryService]
})

export class UserHistoryModule {}
