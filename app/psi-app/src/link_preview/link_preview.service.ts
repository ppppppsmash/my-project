import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class LinkPreviewService {
  constructor() {}
  async linkPreview(url: string): Promise<any> {
    const API_KEY = 'bb3b66ec4667270bea95cf8996842c1b'
    const API_BASE_URL = `https://api.linkpreview.net/?key=${API_KEY}`

    try {
      const { data } = await axios.get(`${API_BASE_URL}&q=${url}`)
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
