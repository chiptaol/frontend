import dayjs, { Dayjs } from 'dayjs'

import { SERVER_DATE_FORMAT } from '~shared/config'

export type DayFilterItem = {
  dayOrDate: string
  weekDay: string
  formatted: string
}

function isWhichDay(date: Dayjs) {
  const today = dayjs()

  if (today.isSame(date.format(SERVER_DATE_FORMAT), 'day')) {
    return 'сегодня'
  }
  if (today.isSame(date.subtract(1, 'day').format(SERVER_DATE_FORMAT), 'day')) {
    return 'завтра'
  }
  if (today.isSame(date.subtract(2, 'day').format(SERVER_DATE_FORMAT), 'day')) {
    return 'послезавтра'
  }

  return null
}

export function normalizeDateArray(dates: string[]): DayFilterItem[] {
  return dates.map((date) => {
    const dayjsObject = dayjs(date)

    return {
      dayOrDate: isWhichDay(dayjsObject) ?? dayjsObject.format('DD'),
      weekDay: dayjsObject.format('dd'),
      formatted: date,
    }
  })
}
