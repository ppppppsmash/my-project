import { Module } from '@nestjs/common'
import { CsvUploadController } from './csv_upload.controller'

@Module({
  controllers: [CsvUploadController]
})
export class PsiUploadModule {}
