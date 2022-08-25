import { attach, createEvent, sample } from 'effector'

import { seanceDayPickerModel } from '~features/seance'
import { seance } from '~entities/seance'

export const mounted = createEvent<number>()

const fetchSeancesFx = attach({
  effect: seance.model.fetchSeancesFx,
})

sample({
  clock: mounted,
  fn: (id) => ({ id, date: null }),
  target: fetchSeancesFx,
})

sample({
  clock: seanceDayPickerModel.$selectedDay,
  source: fetchSeancesFx.done,
  fn: ({ params }, date) => ({ date, id: params.id }),
  target: fetchSeancesFx,
})
