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
  const score = datas.score.pop()
  const label = datas.label.pop()

  const sql = 'INSERT INTO test_db (label, score) VALUES (?, ?)'
  const data = db.query(sql, [label, score])
  db.end()

  return NextResponse.json(data)
}

export async function GET(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const sql = 'SELECT label, score FROM test_db'
  const data = await db.query(sql)
  console.log(data)

  db.end()

  return NextResponse.json(data)
}
