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
import { ScheduleModule } from '@nestjs/schedule'
import { AppDataSource } from './db/data-source'
import configuration from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
        load: [configuration],
        isGlobal: true,
      }),
      TypeOrmModule.forRootAsync({ //forRootではなく、forRootAsync
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          ...configService.get('database'),
        }),
      }),
    //TypeOrmModule.forRoot(AppDataSource.options),
    //ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useClass: TypeOrmConfigService
    // }),
    PsiSiteListModule,
    PsiModule,
    PsiUploadModule,
    CsvDownloadModule,
    LinkPreviewModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
