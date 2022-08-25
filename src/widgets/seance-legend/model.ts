import { seance } from '~entities/seance'

export const $hallTitle = seance.model.$seance.map(
  (seance) => seance?.hall_title ?? null
)
export const $prices = seance.model.$seance.map((seance) => ({
  vip: seance?.seance.prices.vip
    ? beatufiyPrice(seance?.seance.prices.vip)
    : null,
  standard: seance?.seance.prices.standard
    ? beatufiyPrice(seance?.seance.prices.standard)
    : null,
}))
export const $seatsLeft = seance.model.$seance.map(
  (seance) => seance?.seance.seats_left ?? null
)
export const $format = seance.model.$seance.map(
  (seance) => seance?.seance.format ?? null
)

function beatufiyPrice(price: number) {
  return (price / 100)
    .toString()
    .split('')
    .reverse()
    .map((n, i) => (i % 3 === 0 ? `${n} ` : n))
    .reverse()
    .join('')
}
