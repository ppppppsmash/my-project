import { SiteList } from '../entities/site_list.entity'
import { SiteMetrics } from '../entities/site_metrics.entity'

export default () => ({
    port: parseInt(process.env.PORT, 10) || 8080,
    database: {
      type: 'mysql',
      host: process.env.DATABASE_HOST, // docker-compose.yml で指定したコンテナの service 名
      port: Number(process.env.DATABASE_PORT), // ポート番号
      username: process.env.DATABASE_USER, // docker-compose.yml の MYSQL_USER
      password: process.env.DATABASE_ROOT_PASSWORD, // docker-compose.yml の MYSQL_PASSWORD
      database: process.env.DATABASE_DB, // docker-compose.yml の MYSQL_DATABASE
      logging: true, // コンソール画面に実行したSQLが表示される
      synchronize: false, // true にすると migration が自動で実行されます。
      entities: [SiteList, SiteMetrics], // エンティティクラスを指定する（複数の場合はカンマで区切る）
      migrations: ['dist/migration/*.js'], // dist ディレクトリ内の js ファイルを指定する
    }
  });