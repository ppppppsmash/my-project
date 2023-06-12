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

  const { name, url, score } = await request.json()

  const sql = 'INSERT INTO site_list_db (name, url, score) VALUES (?, ?, ?)'
  const result = db.query(sql, [name, url, score])
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

  const sql = 'SELECT id, name, url, score, date FROM site_list_db'
  const data = await db.query(sql)

  db.end()

  return NextResponse.json(data)
}

export async function DELETE(request: Request, response: Response) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  console.log(id)

  const sql = 'DELETE FROM site_list_db WHERE id = ?'
  const data = await db.query(sql, [id])

  db.end()

  return NextResponse.json(data)
}
