import { Module } from '@nestjs/common'
import { ChatGPTController } from './chatgpt.controller'
import { ChatGPTService } from './chatgpt.service'

@Module({
  controllers: [ChatGPTController],
  providers: [ChatGPTService],
})
export class ChatGPTModule {}
