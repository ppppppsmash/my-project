import { NextResponse } from "next/server"

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function GET(request: Request, response: Response) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  const device = searchParams.get('strategy')

  const res = await fetch(`${API_URL}?url=${url}&key=${API_KEY}&strategy=${device}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await res.json()
  // const lighthouse = result.lighthouseResult
  // const score = lighthouse.categories.performance.score * 100
  return NextResponse.json({ result })
}
