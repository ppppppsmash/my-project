import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"

export async function GET(request: Request, response: Response) {
  const db = await dbConnect()
  const sql = 'SELECT id, name, url, score, date, device FROM site_list'
  const data = await db.query(sql)

  db.end()

  return NextResponse.json(data)
}

export async function POST(request: Request, response: Response) {
  const db = await dbConnect()

  const data = await request.json()
  console.log(data)

  const properties = Object.keys(data)
  const values = Object.values(data)

  const placeholders = properties.map(() => '?').join(', ')
  const sql = `INSERT INTO site_list (${properties.join(', ')}) VALUES (${placeholders})`

  const result = await db.query(sql, values)
  db.end()

  return NextResponse.json(result)
}

export async function DELETE(request: Request, response: Response) {
  const db = await dbConnect()

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  console.log(id)

  const sql = 'DELETE FROM site_list WHERE id = ?'
  const result = await db.query(sql, [id])

  db.end()

  return NextResponse.json(result)
}
