import { combine, createEvent, createStore, restore } from 'effector'

import { hallZoomModel } from '~features/hall-zoom'
import { seance } from '~entities/seance'

export const heightAndWidthCalculated = createEvent<{
  width: number
  height: number
}>()

export const seatClicked = createEvent<number>()

export const $selectedSeats = createStore<number[]>([])
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

$selectedSeats.on(seatClicked, (selected, id) => {
  if (selected.includes(id)) return selected.filter((s) => s !== id)

  return selected.concat(id)
})
