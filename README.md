# page-speed-measurement

## Build Setup

```bash
# Dockerを起動
$ docker-compose up -d
# クライアントサイド
$ docker-compose exec client bash
$ npm install
# http://localhost:9998
$ npm run dev


# サーバーサイド
$ docker-compose exec app bash
$ cd psi-app
# http://localhost:9999
$ cd npm run start:dev

# mysql
# http://localhost:3310
$ docker-compose exec db bash
$ mysql -u root -p (rootpasswd)
$ use pagespeedinsight;
$ select * from site_list;　　etc...
```

## このツールについて
PageSpeedInsightを自動で計測し、その数値の変動を記録するためのツールにする予定です。
主にフロントエンドが適宜数値を確認し、施策実施に伴う数値の増減を検証する事に使っていきたいと思っています。

## GCP prod環境
### フロント (Cloud Run)
https://page-speed-measurement-nextapp-oclbewqdfa-an.a.run.app/

### API (Cloud Run)
https://page-speed-measurement-nextapp-api-oclbewqdfa-an.a.run.app

### mysql (Cloud SQL)
devteam-1341:asia-northeast1:pagespeed-insights-db

DEMO:
https://pagespeed-insights-app-oclbewqdfa-an.a.run.app
production client url:
https://page-speed-measurement-nextapp-oclbewqdfa-an.a.run.app
production api url:
https://page-speed-measurement-nextapp-api-oclbewqdfa-an.a.run.app