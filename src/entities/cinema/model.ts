import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { stringifyParams } from '~shared/lib/stringify-params'
import { types } from '~shared/types'

type FetchNearesCinemasRequestParams = {
  latitude: number
  longitude: number
}
type FetchCinemaSeancesRequestParams = Omit<types.FetchCinemaSeancesRequest, 'query'> & {
  date?: string | null
}

type CinemaListItem = types.FetchCinemasRequestDone['answer']['data'][number]
export type NearestCinema = types.FetchNearestCinemasRequestDone['answer']['data'][number]
type Cinema = types.FetchCinemaRequestDone['answer']['data']
export type CinemaMovie = types.FetchCinemaSeancesRequestDone['answer']['data'][number]

export const fetchCinemasFx = attach({ effect: request.fetchCinemasRequestFx })
export const fetchNearesCinemasFx = attach({
  effect: request.fetchNearestCinemasRequestFx,
  mapParams: (params: FetchNearesCinemasRequestParams) => ({ query: stringifyParams({ params }) }),
})
export const fetchCinemaFx = attach({ effect: request.fetchCinemaRequestFx })
export const fetchCinemaSeancesFx = attach({
  effect: request.fetchCinemaSeancesRequestFx,
  mapParams: ({ id, ...params }: FetchCinemaSeancesRequestParams) => ({
    id,
    query: stringifyParams({
      params,
      options: {
        skipNull: true,
      },
    }),
  }),
})

export const $cinemas = createStore<Record<number, CinemaListItem>>({})
export const $cinema = createStore<Cinema | null>(null)
export const $nearestCinemas = createStore<NearestCinema[]>([])
export const $cinemaMovies = createStore<CinemaMovie[]>([])

$cinemas.on(fetchCinemasFx.doneData, (_, { answer }) => normalizr(answer.data))
$nearestCinemas.on(fetchNearesCinemasFx.doneData, (_, { answer }) => [...answer.data])
$cinemaMovies.on(fetchCinemaSeancesFx.doneData, (_, { answer }) => [...answer.data])
$cinema.on(fetchCinemaFx.doneData, (_, { answer }) => answer.data)
