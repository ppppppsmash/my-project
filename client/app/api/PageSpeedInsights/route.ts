import { NextResponse } from "next/server"

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = 'process.env.NEXT_PUBLIC_API_KEY'

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const res = await fetch(`${API_URL}?url=${url}&key=${API_KEY}&strategy=mobile`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  const lighthouse = data.lighthouseResult
  const score = lighthouse.categories.performance.score * 100
  return NextResponse.json({ score })
}
