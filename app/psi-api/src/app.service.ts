import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('分ごとに45秒ずつ実行テスト');
  }

  getHello(): string {
    return 'Hello World!'
  }
}
