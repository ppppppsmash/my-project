import { Injectable } from '@nestjs/common'

@Injectable()
export class ChatGPTService {
  constructor() {}

  private readonly CHATGPT_API_KEY = process.env.CHATGPT_API_KEY
  private readonly CHATGPT_API_URL = 'https://api.openai.com/v1'
  private readonly CHATGPT_MODEL = 'gpt-3.5-turbo'
  private readonly MAX_TOKENS = 600

  async completeChat(message: string): Promise<string> {
    console.log(message)
    try {
      const response = await fetch(`${this.CHATGPT_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.CHATGPT_API_KEY}`,
        },
        body: JSON.stringify({
          model: this.CHATGPT_MODEL,
          messages: [
            {
              role: 'user',
              content: `${message}は、Google PageSpeed Insightsの1つの計測された数値です。
                この数値によって、現在は何の問題がありますか？分析してださい。
                ウェブサイトのパフォーマンスを改善するためには、対処する方法を簡潔に箇条書きで分析して答えてください。
                各句点を区切りとして改行してください。`,
            },
          ],
          max_tokens: this.MAX_TOKENS,
        }),
      })

      const data = await response.json()

      console.log(data)

      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
"You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors."