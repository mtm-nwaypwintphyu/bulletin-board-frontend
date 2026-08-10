import dayjs from 'dayjs'

export const useFormatDate = () => {
  const formatDate = (date, format = 'YYYY-MM-DD') => {
    return date ? dayjs(date).format(format) : ''
  }

  return { formatDate }
}
