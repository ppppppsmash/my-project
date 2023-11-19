import { format, addHours } from 'date-fns'

export const formatDate = (date: string) => {
  const adjustedDate = new Date(date)
  adjustedDate.setTime(adjustedDate.getTime() - 9 * 60 * 60 * 1000)

  //return format(adjustedDate, 'PPP')
  return adjustedDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

export const datePickerFormatDate = (date: string) => {
  const adjustedDate = new Date(date)
  adjustedDate.setTime(adjustedDate.getTime())

  return adjustedDate.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}