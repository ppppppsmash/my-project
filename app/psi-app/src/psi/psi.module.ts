import { Module } from '@nestjs/common'
import { PsiController } from './psi.controller'
import { PsiService } from './psi.service'

@Module({
  controllers: [PsiController],
  providers: [PsiService]
})
export class PsiModule {}
