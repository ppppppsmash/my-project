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

    // 同じemailがすでに存在するかどうかをチェックするクエリ
    const checkExistingUserQuery = `
      SELECT COUNT(*) as count FROM user WHERE email = ?
    `
    const [existingEmail] = await db.query(checkExistingUserQuery, [email])
    if (existingEmail[0].count > 0) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Emailはすでに存在しています.",
        }),
        { status: 400 }
      )
    }

    // emailが存在しない場合は新しいユーザーを挿入
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
