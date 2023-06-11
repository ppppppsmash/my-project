import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const id = params.id
  console.log(id)

  const sql = 'SELECT * FROM site_list_db WHERE id = ?'
  const data = await db.query(sql, [id])

  db.end()

  return NextResponse.json(data)
}

export async function DELETE(request: Request, { params }: {params: {id: number} }) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  const id = params.id

  const sql = 'DELETE FROM site_list_db WHERE id = ?'
  const data = await db.query(sql, [id])

  db.end()

  return NextResponse.json(data)
}
