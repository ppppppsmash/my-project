import { SiteList } from '../entities/site_list.entity'
import { SiteMetrics } from '../entities/site_metrics.entity'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { ConfigService } from "@nestjs/config"
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const configService = new ConfigService()
    return {
      type: 'mysql', // MySQL の場合
      host: configService.get('DATABASE_HOST'), // docker-compose.yml で指定したコンテナの service 名
      port: configService.get('DATABASE_PORT'), // ポート番号
      username: configService.get('DATABASE_USER'), // docker-compose.yml の MYSQL_USER
      password: configService.get('DATABASE_PASSWORD'), // docker-compose.yml の MYSQL_PASSWORD
      database: configService.get('DATABASE_DB'), // docker-compose.yml の MYSQL_DATABASE
      logging: true, // コンソール画面に実行したSQLが表示される
      synchronize: false, // true にすると migration が自動で実行されます。
      entities: [SiteList, SiteMetrics], // エンティティクラスを指定する（複数の場合はカンマで区切る）
      migrations: ['dist/migration/*.js'], // dist ディレクトリ内の js ファイルを指定する
    }
  }
}