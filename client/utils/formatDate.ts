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

export const jpFormatDate =(date: string) => {
  const utcDate = new Date(date)

  const options = { timeZone: 'Asia/Tokyo' }
  return utcDate.toLocaleString('ja-JP', options)
}

export const datePickerFormatDate = (dateString: string) => {
  const sanitizedDateString = dateString.replace(/年|月/g, ' ').replace('日', '');

  const [year, month, day] = sanitizedDateString.split(' ');

  return new Date(`${year}-${month}-${day}`);
}

