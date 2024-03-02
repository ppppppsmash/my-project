import { Controller, Post } from '@nestjs/common'
import { AutoRunService } from './auto_run.service'

@Controller()
export class AutoRunController {

  constructor(private autoRunService: AutoRunService) {}

  @Post('add-cronjob')
  getPSIAuto() {
    this.autoRunService.getPSIAuto()
  }
}
