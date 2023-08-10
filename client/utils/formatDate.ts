export const formatDate = (date: string) => {
  const adjustedDate = new Date(date)
  adjustedDate.setTime(adjustedDate.getTime() - 9 * 60 * 60 * 1000)

  return adjustedDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}