import { NextResponse } from "next/server";

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url='
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function GET(request: Request, response: Response) {
  //const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.NEXT_PUBLIC_API_KEY}&strategy=mobile`);
  const { searchParams } = new URL(request.url);
  // request.url = http://localhost:3000/api/pagespeedInsights
  const url = searchParams.get('url')
  console.log(request.url)
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${API_KEY}&strategy=mobile`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json()
  const lighthouse = data.lighthouseResult
  const score = lighthouse.categories.performance.score * 100
  return NextResponse.json({ score })

}
