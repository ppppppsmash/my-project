import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PsiSiteListModule } from './psi_site_list/psi_site_list.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './db/database.config'
import { PsiModule } from './psi/psi.module'
import { PsiUploadModule } from './csv_upload/csv_upload.module'
import { CsvDownloadModule } from './csv_download/csv_download.module'
import { LinkPreviewModule } from './link_preview/link_preview.module'
import { ChatGPTModule } from './chatgpt/chatgpt.module'
import { AutoRunModule } from './auto_run/auto_run.module'
import { UserHistoryModule } from './user_history/user_history.module'
import { ScheduleModule } from '@nestjs/schedule'
import { AppDataSource } from './db/data-source'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    //AutoRunModule,
    PsiSiteListModule,
    PsiModule,
    PsiUploadModule,
    CsvDownloadModule,
    LinkPreviewModule,
    ChatGPTModule,
    UserHistoryModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
