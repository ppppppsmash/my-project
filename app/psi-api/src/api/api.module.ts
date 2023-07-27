import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppDataSource } from '../data-source';

@Module({
  //imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule {}
