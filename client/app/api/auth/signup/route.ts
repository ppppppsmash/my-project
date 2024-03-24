import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import { dbConnect } from "@/lib/dbConnect"

export async function POST(req: Request) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string
      email: string
      password: string
    }
    const hashedPassword = await hash(password, 10)

    const db = await dbConnect()

    const insertUserQuery = `
      INSERT INTO user (name, email, password)
      VALUES (?, ?, ?)
    `
    const insertUserValues = [name, email.toLowerCase(), hashedPassword]
    await db.query(insertUserQuery, insertUserValues)

    return NextResponse.json({
      user: {
        name,
        email,
      },
    })
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    )
  }
}
