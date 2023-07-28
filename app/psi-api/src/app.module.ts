import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ApiModule } from './api/api.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from './data-source'
import { PsiModule } from './psi/psi.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ApiModule, PsiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
