export const urlValidate = (url: string) => {
  let finalUrl

  try {
    finalUrl = new URL(url)
  } catch (error) {
    finalUrl = new URL('https://' + url)
  }

  return finalUrl.origin
}