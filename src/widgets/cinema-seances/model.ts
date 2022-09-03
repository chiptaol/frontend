import dayjs, { Dayjs } from 'dayjs'
import { attach, createEvent, createStore, sample } from 'effector'

import { cinema } from '~entities/cinema'
import { SERVER_DATE_FORMAT } from '~shared/config'

type DayFilterItem = {
  dayOrDate: string
  weekDay: string
  formatted: string
}

export const mounted = createEvent<number>()
export const daySelected = createEvent<string>()

export const $days = createStore<DayFilterItem[]>([])
export const $selectedDay = createStore<null | string>(null)

const fetchSeancesFx = attach({
  effect: cinema.model.fetchCinemaSeancesFx,
  source: $selectedDay,
  mapParams: (id: number, date) => ({ date, id }),
})

$days.on(cinema.model.fetchCinemaSeancesFx.doneData, (_, { answer }) =>
  normalizeDateArray([...answer.schedule])
)
$selectedDay
  .on(daySelected, (_, selected) => selected)
  .on(cinema.model.fetchCinemaSeancesFx.done, (selected, { params, result }) => {
    if (!params.date) return result.answer.schedule[0] ?? null
    if (selected !== params.date) return params.date

    return selected
  })

sample({
  clock: mounted,
  target: fetchSeancesFx,
})

sample({
  clock: $selectedDay,
  source: fetchSeancesFx.done,
  fn: ({ params }) => params,
  target: fetchSeancesFx,
})

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

function normalizeDateArray(dates: string[]): DayFilterItem[] {
  return dates.map((date) => {
    const dayjsObject = dayjs(date)

    return {
      dayOrDate: isWhichDay(dayjsObject) ?? dayjsObject.format('DD'),
      weekDay: dayjsObject.format('dd'),
      formatted: date,
    }
  })
}
