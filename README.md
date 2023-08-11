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

## CSSについて
宅配ごはんの管理ツールをもとにレイアウト調整<br>
皆さんにこんな見た目だともっといいじゃないの、っていう意見をお伺いしたいです。<br>
UIのサンプルなどご提示いただけると大変助かります。

## Firebase
https://console.firebase.google.com/project/page-speed-measurement/database/page-speed-measurement-default-rtdb/data/~2F-NE8eUYp9napkDZUyDla

## 今後実装したいこと
- ページ上から指定URLを追加
- URLごとにスコア表を分ける
- 再取得ボタン
- 毎日自動スコア取得（時間指定でバッチを動かすはずなので、Nuxt外だが...）

### その他要件について
- スコア変動がグラフで可視化
- 総評スコアの他に、スコアの内訳も見れるように
- 過去登録したサイトをセレクトボックス（サイト単位）で選択して表示ソートができる
- （見た目の話）表組の幅を統一
- 自動取得できるようになったら、一定のスコアを下回った場合アラート通知
- 毎日のスコアの保存機能<br>
↑保存機能を考えるならFirestore Databaseを利用したほうが良さそう
- Vacelのcron job利用したらバックエンドに頼らずとも自動取得できるかも -> (変更点：バックエンドnest.jsのcronjobを試している)
- スコアの文字色などを実際のPSIに合わせて色分けする

### Stack Information
- next.js v13.0：https://nextjs.org/
- nest.js： https://docs.nestjs.com/
- tailwindcss： https://tailwindcss.com/
- icon ui：https://react-icons.github.io/react-icons/ && https://heroicons.com/
- component ui：https://headlessui.com/

### pagespeed insights 参考URL:
- https://developers.google.com/speed/docs/insights/v5/get-started?hl=ja