import { Controller, Get, Query } from '@nestjs/common'
import { PsiService } from './psi.service'

// exp. http://localhost:9999/psi?url=https://google.com&strategy=mobile
@Controller('psi')
export class PsiController {
  constructor(private readonly psiService: PsiService) {}

  @Get()
  async getPageSpeedData(@Query('url') url: string, @Query('strategy') strategy: string) {
    return this.psiService.fetchData(url, strategy);
  }
}
