import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { stringifyParams } from '~shared/lib/stringify-params'
import { types } from '~shared/types'

type FetchSeancesParams = {
  date: string | null
} & Omit<types.FetchSeancesRequest, 'query'>

export const fetchSeancesFx = attach({
  effect: request.fetchSeancesRequestFx,
  mapParams: ({ id, ...params }: FetchSeancesParams) => ({
    id,
    query: stringifyParams({
      params,
      options: { skipNull: true, skipEmptyString: true },
    }),
  }),
})

export const $seances = createStore<types.Seance[]>([])

$seances.on(fetchSeancesFx.doneData, (_, { answer }) => [...answer.data])
