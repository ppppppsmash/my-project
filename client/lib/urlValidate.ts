export const urlValidate = (url: string) => {
  let finalUrl

  try {
    finalUrl = new URL(url)
  } catch (error) {
    finalUrl = new URL('https://' + url)
  }

  console.log(finalUrl)

  return finalUrl.origin
}