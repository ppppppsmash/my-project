import { NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"

export async function GET(request: Request, { params }: { params: { id: number } }) {
  const db = await dbConnect()

  const { id } = params
  const sql = 'SELECT * FROM site_list WHERE id = ?'
  const result = await db.query(sql, [id])
  db.end()

  return NextResponse.json(result)
}

export async function DELETE(request: Request, { params }: {params: {id: number} }) {
  const db = await dbConnect()

  const { id } = params
  const sql = 'DELETE FROM site_list WHERE id = ?'
  const result = await db.query(sql, [id])

  db.end()
  return NextResponse.json(result)
}

export async function PATCH(request: Request, {params}: {params: {id: number}}) {
  const db = await dbConnect()

  const { id } = params
  const { score } = await request.json()
  const sql = 'UPDATE site_list SET score = ? WHERE id = ?'
  const result = db.query(sql, [score, id])

  db.end()
  return NextResponse.json(result)
}
