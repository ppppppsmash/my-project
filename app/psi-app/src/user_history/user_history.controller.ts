import { Controller, Get, Post, Param, Body } from '@nestjs/common'
import { UserHistoryService } from './user_history.service'

@Controller('user_history')
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Get(':user_id')
  async getUserHistory(@Param('user_id') userId: number) {
    return this.userHistoryService.getUserHistory(userId)
  }

  @Post()
  async postUserHistory(@Body() data): Promise<any> {
    return this.userHistoryService.postUserHistory(data)
  }
}
