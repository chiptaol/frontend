import { attach, sample } from 'effector'

import { buyTicketModel } from '~features/buy-ticket'
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
  clock: buyTicketModel.formValidated,
  source: seance.model.$seance,
  filter: Boolean,
  fn: ({ seance }, fields) => ({ id: seance.id, ...fields }),
  target: bookTicketFx,
})
