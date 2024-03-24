import { Injectable } from '@nestjs/common'

@Injectable()
export class LinkPreviewService {
  constructor() {}
  async linkPreview(url: string): Promise<any> {
    const LINK_PREVIEW_API_KEY = process.env.LINK_PREVIEW_API_KEY
    const LINK_PREVIEW_API_URL = `${process.env.LINK_PREVIEW_API_URL}?key=${LINK_PREVIEW_API_KEY}`

    try {
      const response = await fetch(`${LINK_PREVIEW_API_URL}&q=${url}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
