import { createEffect } from 'effector'

import { parseByStatus } from '~shared/lib/parse-by-status'
import { contract, types } from '~shared/types'

import { authenticatedRequestFx } from '../init'

export const fetchSeanceRequestFx = createEffect<
  types.FetchSeanceRequest,
  types.FetchSeanceRequestDone,
  types.FetchSeanceRequestFail
>({
  async handler({ id }) {
    const name = 'fetchSeanceRequestFx.body'
    const response = await authenticatedRequestFx({
      path: `seances/${id}`,
      method: 'GET',
    })

    return parseByStatus(name, response, {
      200: ['ok', contract.fetchSeanceRequestOk],
    })
  },
})
