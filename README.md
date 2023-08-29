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
$ use pagespeedinsight; => select * from site_list;
```

## このツールについて
PageSpeedInsightを自動で計測し、その数値の変動を記録するためのツールにする予定です。
主にフロントエンドが適宜数値を確認し、施策実施に伴う数値の増減を検証する事に使っていきたいと思っています。

## これまで実装したこと：
- ページ上から指定URLを追加　ー＞　サイト名・URL・デバイス選択で登録・追加✅
- URLごとにスコア表を分ける　ー＞　URLリスト と 各URL詳細ページ✅
- 再取得ボタン　ー＞　新しい数値を取得した上で、これまでのデータに集計される✅
- スコア変動がグラフで可視化✅
- 総評スコアの他に、スコアの内訳も見れるように（各詳細ページで）✅
- （見た目の話）表組の幅を統一　ー＞　見た目全体的にUIライブラリを使用 ✅
- 毎日のスコアの保存機能　ー＞　MySQLに保存 ✅
- スコアの文字色などを実際のPSIに合わせて色分けする ✅
- バリデーション✅
- 登録した内容　編集・削除✅
- UI・UX向上 ー＞ css style ✅
- PSIデータ比較機能 ✅
- CSVファイルでサイト登録✅
- Chartのライトボックス✅
- ダークモード✅
- リンクプレビュー機能✅

### TODOリスト
- 見た目改善
- スケジュール設定 + CronJob
- アップ済みのCSVファイルのダウンロード機能
- PSIの数値種類と出力したい項目を整理（MetricsやLightHouseなど）
- インフラ環境構築 && デプロイ

### Stack Information
- next.js v13.0：https://nextjs.org/
- nest.js： https://docs.nestjs.com/
- tailwindcss： https://tailwindcss.com/
- icon ui：https://react-icons.github.io/react-icons/ && https://heroicons.com/
- component ui：https://headlessui.com/ && https://www.radix-ui.com/

### pagespeed insights 参考URL:
- https://developers.google.com/speed/docs/insights/v5/get-started?hl=ja


## DB構成
```
CREATE TABLE pagespeedinsights.site_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device ENUM('desktop', 'mobile'),
  name VARCHAR(50),
  url VARCHAR(50),
  schedule VARCHAR(10),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE pagespeedinsights.site_metrics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  FOREIGHT KEY site_list_id REFERENCES pagespeedinsights.site_list.id
  score INT,
  schedule VARCHAR(10),
  date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  lcp VARCHAR(10),
  fid VARCHAR(10),
  cls VARCHAR(10),
  fcp VARCHAR(10),
  tbt VARCHAR(10),
  si VARCHAR(10)
);
```

## API
**ページ一覧**
- http://localhost:9999/psi_site_list
**各ページダイナミックルート**
- http://localhost:9999/psi_site_list/[id]
**psi score**
- http://localhost:9999/psi?url=${url}&strategy=${device}
**CSVファイル**
- http://localhost:9999/upload
**リンクプレビュー**
- http://localhost:9999/link_preview?url=${url}
