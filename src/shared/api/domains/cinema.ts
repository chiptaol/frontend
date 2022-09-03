import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchCinemasRequestFx = createEffect<
  void,
  types.FetchCinemasRequestDone,
  types.FetchCinemasRequestFail
>({
  async handler() {
    const name = 'fetchCinemasRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'cinemas',
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchCinemasRequestOk],
    })
  },
})

export const fetchNearestCinemasRequestFx = createEffect<
  types.FetchNearestCinemasRequest,
  types.FetchNearestCinemasRequestDone,
  types.FetchNearestCinemasRequestFail
>({
  async handler({ query }) {
    const name = 'fetchNearestCinemasRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/nearest${query}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchNearestCinemasRequestOk],
    })
  },
})

export const fetchCinemaRequestFx = createEffect<
  types.FetchCinemaRequest,
  types.FetchCinemaRequestDone,
  types.FetchCinemaRequestFail
>({
  async handler({ id }) {
    const name = 'fetchCinemaRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${id}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchCinemaRequestOk],
    })
  },
})

export const fetchCinemaSeancesRequestFx = createEffect<
  types.FetchCinemaSeancesRequest,
  types.FetchCinemaSeancesRequestDone,
  types.FetchCinemaSeancesRequestFail
>({
  async handler({ id, query }) {
    const name = 'fetchCinemaSeancesRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `cinemas/${id}/seances${query}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchCinemaSeancesRequestOk],
    })
  },
})
