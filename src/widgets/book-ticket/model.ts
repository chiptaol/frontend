import { attach, sample } from 'effector'

import { bookTicketModel } from '~features/book-ticket'
import { selectSeatModel } from '~features/select-seat'
import { seance } from '~entities/seance'
import { types } from '~shared/types'

const bookTicketFx = attach({
  effect: seance.model.bookTicketFx,
  source: selectSeatModel.$selectedSeatsIds,
  mapParams: (params: Omit<types.BookTicketRequest, 'seat_ids'>, ids) => ({
    ...params,
    seat_ids: ids,
  }),
})

sample({
  clock: bookTicketModel.formValidated,
  source: seance.model.$seance,
  filter: Boolean,
  fn: ({ seance }, fields) => ({ id: seance.id, ...fields }),
  target: bookTicketFx,
})
