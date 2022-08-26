import { combine, createEvent, restore } from 'effector'

import { hallZoomModel } from '~features/hall-zoom'
import { seance } from '~entities/seance'
import { selectSeatModel } from '~features/select-seat'

export const heightAndWidthCalculated = createEvent<{
  width: number
  height: number
}>()

export const $width = restore(
  heightAndWidthCalculated.map(({ width }) => width),
  0
)
export const $height = restore(
  heightAndWidthCalculated.map(({ height }) => height),
  0
)
export const $seats = seance.model.$seance.map(
  (seance) => seance?.seance.seats ?? []
)
export const $rows = $seats.map((seats) => {
  return seats.reduce<Record<number, number>>((acc, next) => {
    acc[next.row] = next.y
    return acc
  }, {})
})
export const $isBookingLimitExpired = selectSeatModel.$selectedSeatsIds.map(
  (seats) => seats.length === 5
)

export const $scaledWidth = combine(
  $width,
  hallZoomModel.$scale,
  (width, scale) => width * scale
)
export const $scaledHeight = combine(
  $height,
  hallZoomModel.$scale,
  (height, scale) => height * scale
)
