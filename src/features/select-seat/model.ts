import { combine, createEvent, createStore } from 'effector'
import { seance } from '~entities/seance'
import { normalizr } from '~shared/lib/normalizr'

export const seatClicked = createEvent<number>()
export const removeSeat = createEvent<number>()

export const $selectedSeatsIds = createStore<number[]>([])

const $seatsDict = seance.model.$seance.map((seance) =>
  normalizr(seance?.seance.seats ?? [])
)
export const $selectedSeats = combine(
  $seatsDict,
  $selectedSeatsIds,
  (dict, ids) => ids.map((id) => dict[id])
)

$selectedSeatsIds
  .on(seatClicked, (selected, id) => {
    if (selected.includes(id)) return selected.filter((s) => s !== id)

    return selected.concat(id)
  })
  .on(removeSeat, (seats, id) => seats.filter((seat) => seat !== id))
