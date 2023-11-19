import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class PsiService {
  constructor() {}
  private readonly PSI_API_URL = process.env.PSI_API_URL
  private readonly PSI_API_KEY = process.env.PSI_API_KEY

  async fetchData(url: string, strategy: string): Promise<any> {

    const { data } = await axios.get(`${this.PSI_API_URL}?url=${url}&key=${this.PSI_API_KEY}&strategy=${strategy}`)

    return data
  }
}