
import { urlValidate } from '@/utils/validation'

export const fetchLinkPreview = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}link_preview?url=${urlValidate(url)}`, {
      cache: 'no-store',
      mode: 'cors'
    })
    const data = await res.json()

    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}
