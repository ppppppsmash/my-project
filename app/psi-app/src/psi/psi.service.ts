import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class PsiService {
  constructor() {}
  async fetchData(url: string, strategy: string): Promise<any> {
    const PSI_API_URL = process.env.PSI_API_URL
    const PSI_API_KEY = process.env.PSI_API_KEY

    const { data } = await axios.get(`${PSI_API_URL}?url=${url}&key=${PSI_API_KEY}&strategy=${strategy}`)

    return data
  }
}