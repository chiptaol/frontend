import { createEvent, sample } from 'effector'

import { selectSeatModel } from '~features/select-seat'
import { convertToSum } from '~shared/lib/convert-to-sum'

export const seatRemoved = createEvent<number>()

export const $seatsCount = selectSeatModel.$selectedSeats.map(
  (seats) => seats.length
)
const $seatsTotalPrice = selectSeatModel.$selectedSeats.map((seats) =>
  seats.reduce((acc, next) => acc + next.price, 0)
)
export const $seatsBeautifiedTotalPrice = $seatsTotalPrice.map((price) =>
  convertToSum(price)
)
export const $isSeatSelected = $seatsCount.map((count) => count > 0)

sample({
  clock: seatRemoved,
  target: selectSeatModel.removeSeat,
})
