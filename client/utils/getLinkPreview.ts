
import { urlValidate } from '@/utils/validation'

export const fetchLinkPreview = async (url: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_URL}link_preview?q=${urlValidate(url)}`, {
      cache: 'no-store'
    })
    console.log(res)

    return res
  } catch (error) {
    console.error(error)
  }
}