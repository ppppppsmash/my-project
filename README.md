# page-speed-measurement

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## このツールについて
PageSpeedInsightを自動で計測し、その数値の変動を記録するためのツールにする予定です。
主にフロントエンドが適宜数値を確認し、施策実施に伴う数値の増減を検証する事に使っていきたいと思っています。

## 現状の実装状況
- 簡単なレイアウト
- サンプル（宅配ごはん）の指定URLの数値を自動取得（読み込み時）
- Firebase上に数値を保持

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
- Vacelのcron job利用したらバックエンドに頼らずとも自動取得できるかも
- スコアの文字色などを実際のPSIに合わせて色分けする
