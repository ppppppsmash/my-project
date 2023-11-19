import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { ChatGPTService } from './chatgpt.service'

@Controller('chatgpt')
export class ChatGPTController {
  constructor(private readonly chatGPTService: ChatGPTService) {}

  @Get('diagnosis')
  async completeChat(@Query('message') message: string): Promise<string> {
    return this.chatGPTService.completeChat(message)
  }
}
