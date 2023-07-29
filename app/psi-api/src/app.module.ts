import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiModule } from './api/api.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from './data-source'

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
