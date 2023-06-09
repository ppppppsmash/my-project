import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'

export async function POST(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const datas = await request.json()
  console.log(datas)
  const name = datas.name
  const url = datas.url
  const score = datas.score

  const sql = 'INSERT INTO site_list_db (name, url, score) VALUES (?, ?, ?)'
  const result = db.query(sql, [name, url, score])
  db.end()

  return NextResponse.json(result)
}
