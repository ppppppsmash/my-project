import { Page } from './entities/page.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql', // MySQL の場合
  host: 'db', // docker-compose.yml で指定したコンテナの service 名
  port: 3310, // ポート番号
  username: 'root', // docker-compose.yml の MYSQL_USER
  password: 'rootpasswd', // docker-compose.yml の MYSQL_PASSWORD
  database: 'pagespeedinsights', // docker-compose.yml の MYSQL_DATABASE
  logging: true, // コンソール画面に実行したSQLが表示される
  synchronize: false, // true にすると migration が自動で実行されます。
  entities: [Page], // エンティティクラスを指定する（複数の場合はカンマで区切る）
  migrations: ['dist/migration/*.js'], // dist ディレクトリ内の js ファイルを指定する
});