import { seance } from '~entities/seance'
import { formatDate } from '~shared/lib/format-date'

export const $movieName = seance.model.$seance.map(
  (seance) => seance?.movie_title ?? null
)
export const $cinemaTitle = seance.model.$seance.map(
  (seance) => seance?.cinema_title ?? null
)
export const $startDate = seance.model.$seance.map((seance) =>
  formatDate(seance?.seance.start_date_time, 'DD MMMM')
)
export const $movieId = seance.model.$seance.map(
  (seance) => seance?.seance.movie_id ?? null
)
