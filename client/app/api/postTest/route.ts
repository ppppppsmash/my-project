import { NextResponse } from "next/server"
import mysql from 'mysql2'
//import * as mysql from 'promise-mysql'

export async function POST(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  //db.connect()
  const datas = await request.json()
  const data = datas.score.map((data: string) => {
    return data
  })
  console.log(data)
  const sql = 'INSERT INTO test_api (score) VALUES (?)'
  const result = db.query(sql, data)
  db.end()

  return NextResponse.json(result)
}