import dayjs, { Dayjs } from 'dayjs'

import { SERVER_DATE_FORMAT } from '~shared/config'

function isWhichDay(date: Dayjs) {
  const today = dayjs()

  if (today.isSame(date.format('YYYY-MM-DD'), 'day')) {
    return 'сегодня'
  }
  if (today.isSame(date.subtract(1, 'day').format('YYYY-MM-DD'), 'day')) {
    return 'завтра'
  }
  if (today.isSame(date.subtract(2, 'day').format('YYYY-MM-DD'), 'day')) {
    return 'послезавтра'
  }

  return null
}

export function generateFiveDaysAhead() {
  const days = [dayjs()]
  for (let i = 0; i < 4; i++) {
    const prevDateObject = days[i]
    const current = prevDateObject.add(1, 'day')
    days.push(current)
  }

  return days.map((day) => ({
    day: day.format('dd'),
    whichDay: isWhichDay(day) ?? day.format('DD'),
    formatted: day.format(SERVER_DATE_FORMAT),
  }))
}
