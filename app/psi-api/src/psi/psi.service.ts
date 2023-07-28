import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class PsiService {
  constructor() {}
  async fetchData(url: string, strategy: string): Promise<any> {
    const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
    const API_KEY = 'AIzaSyCT4r-7MqXnB5rZW2OkqqPvfSQkoffXDbk'

    const {data} = await axios.get(`${API_URL}?url=${url}&key=${API_KEY}&strategy=${strategy}`)

    return data
  }
}
