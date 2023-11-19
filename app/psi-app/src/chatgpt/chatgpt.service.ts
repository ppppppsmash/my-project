import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class ChatGPTService {
  constructor() {}
  private readonly CHATGPT_API_KEY = process.env.CHATGPT_API_KEY
  private readonly CHATGPT_API_URL = 'https://api.openai.com/v1'
  private readonly CHATGPT_MODEL = 'gpt-3.5-turbo'

  async completeChat(message: string): Promise<string> {
    try {
      const { data } = await axios.post(
        `${this.CHATGPT_API_URL}/chat/completions`,
        {
          model: this.CHATGPT_MODEL,
          messages: [
            {
              'role': 'user',
              'content': `${message}について、パフォーマンスの改善方法を簡潔な言葉で箇条書きで教えてください。`
            }
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.CHATGPT_API_KEY}`,
          },
        }
      )

      return data
      // return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
