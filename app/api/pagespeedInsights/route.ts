import { NextApiRequest, NextApiResponse } from "next";

const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const API_KEY = process.env.API_KEY

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // if(req.method === 'GET') {
  //   const { url } = req.query
  //   const response = await fetch(`${API_URL}?url=${url}&key=${API_KEY}&stragtegy=mobile`)
  //   const data = await response.json()
  //   res.status(200).json(data)
  // }
}
