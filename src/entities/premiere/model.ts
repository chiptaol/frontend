import { attach, createStore } from 'effector'

import { request } from '~shared/api'
import { stringifyParams } from '~shared/lib/stringify-params'
import { types } from '~shared/types'

type FetchPremieresRequestParams = {
  date: string | null
}

export const $actualPremieres = createStore<types.ActualPremiere[]>([])
export const $premieres = createStore<types.Premiere[]>([])

export const fetchActualPremieresFx = attach({
  effect: request.fetchActualPremieresRequestFx,
})
export const fetchPremieresFx = attach({
  effect: request.fetchPremieresRequestFx,
  mapParams: (params: FetchPremieresRequestParams) => ({
    query: stringifyParams({ params, options: { skipNull: true } }),
  }),
})

$actualPremieres.on(fetchActualPremieresFx.doneData, (_, { answer }) => [
  ...answer.data,
])
$premieres.on(fetchPremieresFx.doneData, (_, { answer }) => [
  ...answer.premieres,
])
