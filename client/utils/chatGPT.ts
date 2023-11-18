const CHATGPT_API_KEY = process.env.NEXT_PUBLIC_CHATGPT_API_KEY
const CHATGPT_API_URL = 'https://api.openai.com/v1'
const CHATGPT_MODEL = 'gpt-3.5-turbo'

export const chatGPT = async (message: string) => {
  try {
    const response = await fetch(
      `${CHATGPT_API_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CHATGPT_API_KEY}`
        },
        body: JSON.stringify({
          model: CHATGPT_MODEL,
          messages: [
            {
              'role': 'user',
              'content': `${message}について、パフォーマンスの改善方法を簡潔な言葉で箇条書きで教えてください。`
            }
          ],
          max_tokens: 100
        })
      }
    )

    const responseData = await response.json()
    return responseData.choices[0].message.content
  } catch (error) {
    console.error(error)
    return null
  }
}