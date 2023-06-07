import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'
//import * as mysql from 'promise-mysql'

export async function POST(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const datas = await request.json()
  const data = datas.score.pop()
  const label = datas.label.pop()
  console.log(data, label)
  const sql = 'INSERT INTO test_api (label, score) VALUES (?, ?)'
  const result = db.query(sql, [label, data])
  db.end()

  return NextResponse.json(result)
}

export async function GET(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const sql = 'SELECT label, score FROM test_api'
  const data = await db.query(sql)
  console.log(data)

  db.end()

  return NextResponse.json(data)
}
