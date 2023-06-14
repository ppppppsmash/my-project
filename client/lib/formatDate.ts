const UTCSet = (originalDate: any) => {
  const utcTime = originalDate.getTime()
  const date = new Date(utcTime)
  const offsetDiff = date.getTimezoneOffset()
  date.setTime(utcTime + offsetDiff * 1000 * 60)
  return date
}

export const formatDate = (timestamp: string | undefined) => {
  if(!timestamp) return
  const TOKYO_TIMEZONE = 540
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const utcHours = UTCSet(date)
  const hours = utcHours.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  const formattedDate = `${year}/${month}/${day}`
  const formattedTime = `${hours}:${minutes}:${seconds}`

  return `${formattedDate}\n${formattedTime}`
}
