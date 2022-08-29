import { combine, createEvent, createStore, sample } from 'effector'

import { seance } from '~entities/seance'
import { normalizr } from '~shared/lib/normalizr'

export const seatClicked = createEvent<number>()
export const removeSeat = createEvent<number>()
const resetSelectedSeats = createEvent()

export const $selectedSeatsIds = createStore<number[]>([])

const $seatsDict = seance.model.$seance.map((seance) =>
  normalizr(seance?.seance.seats ?? [])
)
export const $selectedSeats = combine(
  $seatsDict,
  $selectedSeatsIds,
  (dict, ids) => ids.map((id) => dict[id]).filter(Boolean)
)

$selectedSeatsIds
  .on(seatClicked, (selected, id) => {
    if (selected.includes(id)) return selected.filter((s) => s !== id)

    return selected.concat(id)
  })
  .on(removeSeat, (seats, id) => seats.filter((seat) => seat !== id))
  .reset(resetSelectedSeats)

sample({
  clock: seance.model.seatUpdated,
  source: $selectedSeatsIds,
  fn: (ids, { id }) => ids.filter((seatId) => seatId !== id),
  target: $selectedSeatsIds,
})

sample({
  clock: seance.model.cancelTicketBookFx.done,
  target: resetSelectedSeats,
})
