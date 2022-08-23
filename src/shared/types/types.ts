import * as typed from 'typed-contracts'
import { contract } from './contract'

export type GenericErrors =
  | {
      status: 'unexpected'
      error: Error
    }
  | {
      status: 'unknown_status'
      error: { status: number; body: unknown }
    }
  | {
      status: 'validation_error'
      error: typed.ValidationError
    }

export type FetchActualPremieresRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchActualPremieresRequestOk>
}
export type FetchActualPremieresRequestFail = GenericErrors

export type ActualPremiere = typed.Get<typeof contract.actualPremiere>

export type Premiere = typed.Get<typeof contract.premiere>

export type FetchPremieresRequest = {
  query: string
}
export type FetchPremieresRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchPremieresRequestOk>
}
export type FetchPremieresRequestFail = GenericErrors
