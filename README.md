# psi-app

## Build Setup

## コンテナ起動
```bash
docker-compose up -d
```

## フロントエンド
```bash
docker-compose exec client bash
npm run dev
```

## バックエンド
```bash
docker-compose exec app bash
cd psi-api
npm run start:dev
```