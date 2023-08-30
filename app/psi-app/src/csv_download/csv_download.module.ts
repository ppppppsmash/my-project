import { Module } from '@nestjs/common'
import { CsvDownloadController } from './csv_download.controller'

@Module({
  controllers: [CsvDownloadController]
})
export class CsvDownloadModule {}
