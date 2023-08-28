import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class LinkPreviewService {
  constructor() {}
  async linkPreview(url: string): Promise<any> {
    const LINK_PREVIEW_API_KEY = process.env.LINK_PREVIEW_API_KEY
    const LINK_PREVIEW_API_URL = `${process.env.LINK_PREVIEW_API_URL}?key=${LINK_PREVIEW_API_KEY}`

    try {
      const { data } = await axios.get(`${LINK_PREVIEW_API_URL}&q=${url}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
