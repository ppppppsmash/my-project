export const formatDate = (timestamp: string | undefined) => {
  if(!timestamp) return
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate();

  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  const formattedDate = `${year}/${month}/${day}`
  const formattedTime = `${hours - 9}:${minutes}:${seconds}`

  return `${formattedDate}\n${formattedTime}`
}
