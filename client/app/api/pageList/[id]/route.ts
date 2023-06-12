import { NextResponse } from "next/server"
import mysql from 'mysql2/promise'
// import { dbConnect } from "@/lib/dbConnect"

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  try {
    const { id } = params
    const sql = 'SELECT * FROM site_list_db WHERE id = ?'
    const result = await db.query(sql, [id])
    db.end()

    return NextResponse.json(result)
  } catch (error) {
    console.log(`db connection failed :${error}`)
    return NextResponse.json(error)
  }
}

export async function DELETE(request: Request, { params }: {params: {id: number} }) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  try {
    const { id } = params
    const sql = 'DELETE FROM site_list_db WHERE id = ?'
    const result = await db.query(sql, [id])

    db.end()
    return NextResponse.json(result)
  } catch(error) {
    console.log(`db connection failed :${error}`)
    return NextResponse.json(error)
  }
}

export async function PATCH(request: Request, {params}: {params: {id: number}}) {
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })

  try {
    const { id } = params
    const { score } = await request.json()
    const sql = 'UPDATE site_list_db SET score = ? WHERE id = ?'
    const result = db.query(sql, [score, id])

    db.end()
    return NextResponse.json(result)
  } catch (error) {
    console.log(`db connection failed :${error}`)
    return NextResponse.json(error)
  }
}
