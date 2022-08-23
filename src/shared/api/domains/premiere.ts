import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchActualPremieresRequestFx = createEffect<
  void,
  types.FetchActualPremieresRequestDone,
  types.FetchActualPremieresRequestFail
>({
  async handler() {
    const name = 'fetchActualPremieresRequestFx.body'
    const response = await authenticatedRequestFx({
      path: 'premieres/actual',
      method: 'GET',
    })
    console.log(name)

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchActualPremieresRequestOk],
    })
  },
})

export const fetchPremieresRequestFx = createEffect<
  types.FetchPremieresRequest,
  types.FetchPremieresRequestDone,
  types.FetchPremieresRequestFail
>({
  async handler({ query }) {
    const name = 'fetchPremieresRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `premieres${query}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchPremieresRequestOk],
    })
  },
})
