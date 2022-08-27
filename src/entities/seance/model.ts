import { attach, createEvent, createStore } from 'effector'

import { request } from '~shared/api'
import { stringifyParams } from '~shared/lib/stringify-params'
import { types } from '~shared/types'

type FetchPremiereSeancesParams = {
  date: string | null
} & Omit<types.FetchSeancesRequest, 'query'>

type SeanceOverall = types.FetchSeanceRequestDone['answer']['data']

export const resetBooked = createEvent()

export const fetchPremiereSeancesFx = attach({
  effect: request.fetchSeancesRequestFx,
  mapParams: ({ id, ...params }: FetchPremiereSeancesParams) => ({
    id,
    query: stringifyParams({
      params,
      options: { skipNull: true, skipEmptyString: true },
    }),
  }),
})
export const fetchSeanceFx = attach({ effect: request.fetchSeanceRequestFx })
export const bookTicketFx = attach({ effect: request.bookTicketRequestFx })

export const $premiereSeances = createStore<types.PremiereSeance[]>([])
export const $seance = createStore<SeanceOverall | null>(null)
export const $book = createStore<null | types.Book>(null)

$premiereSeances.on(fetchPremiereSeancesFx.doneData, (_, { answer }) => [
  ...answer.data,
])
$seance.on(fetchSeanceFx.doneData, (_, { answer }) => answer.data)
$book.on(bookTicketFx.doneData, (_, { answer }) => answer).reset(resetBooked)
