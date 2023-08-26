import { Module } from '@nestjs/common'
import { PsiUploadController } from './psi_upload.controller'

@Module({
  controllers: [PsiUploadController]
})
export class PsiUploadModule {}
