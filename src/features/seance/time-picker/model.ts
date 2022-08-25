import { createStore } from 'effector'

import { seance } from '~entities/seance'
import { convertToSum } from '~shared/lib/convert-to-sum'
import { formatDate } from '~shared/lib/format-date'
import { types } from '~shared/types'

export type SeancesSchedule = types.FetchSeanceRequestDone['answer']['schedule']
export type NormalizedSchedule = ReturnType<typeof normalizr>

export const $seancesSchedule = createStore<NormalizedSchedule>([])
export const $selectedSeance = createStore<number | null>(null)

$seancesSchedule.on(seance.model.fetchSeanceFx.doneData, (_, { answer }) =>
  normalizr(answer.schedule)
)
$selectedSeance.on(
  seance.model.fetchSeanceFx.doneData,
  (_, { answer }) => answer.data.seance.id
)

function normalizr(schedule: SeancesSchedule) {
  return schedule.map((seance) => ({
    id: seance.id,
    price: lowestPrice(seance.prices),
    startTime: formatDate(seance.start_date_time, 'HH:mm'),
  }))
}

function lowestPrice(prices: SeancesSchedule[number]['prices']) {
  const filtered = Object.values(prices).filter(Boolean).map(Number)

  const min = Math.min(...filtered)

  return convertToSum(min)
}
