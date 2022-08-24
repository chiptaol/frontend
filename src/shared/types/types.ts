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

export type FetchMovieRequest = {
  id: number
}
export type FetchMovieRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchMovieRequestOk>
}
export type FetchMovieRequestNotFound = {
  status: 'not_found'
  error: typed.Get<typeof contract.fetchMovieRequestNotFound>
}
export type FetchMovieRequestFail = FetchMovieRequestNotFound | GenericErrors

export type Movie = typed.Get<typeof contract.movie>
