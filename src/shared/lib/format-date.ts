import dayjs from 'dayjs'

export const formatDate = (
  date: dayjs.ConfigType,
  format?: string,
  inputFormat?: string
) => {
  return dayjs(date, inputFormat).format(format ?? 'DD-MM-YYYY')
}
