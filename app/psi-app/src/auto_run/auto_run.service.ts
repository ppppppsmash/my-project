import { Injectable, Logger } from '@nestjs/common'
import { Cron, Interval, Timeout } from '@nestjs/schedule'
import { PsiSiteListService } from '../psi_site_list/psi_site_list.service'
// import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule'
// import { CronJob } from 'cron'

@Injectable()
export class AutoRunService {
  constructor(private readonly psiSiteListService: PsiSiteListService) { }

  private readonly logger = new Logger(AutoRunService.name);

  @Cron('45 * * * * *')
  handleCron() {
    this.logger.debug('Called when the second is 45');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}