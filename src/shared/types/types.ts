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

export type FetchSeancesRequest = {
  id: number
  query: string
}
export type FetchSeancesRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchSeancesRequestOk>
}
export type FetchSeancesRequestFail = GenericErrors

export type PremiereSeance = typed.Get<typeof contract.premiereSeance>

export type Seance = typed.Get<typeof contract.seance>

export type FetchSeanceRequest = {
  id: number
}
export type FetchSeanceRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchSeanceRequestOk>
}
export type FetchSeanceRequestFail = GenericErrors

export type Book = typed.Get<typeof contract.book>

export type BookTicketRequest = {
  id: number
  email: string
  phone: string
  seat_ids: number[]
}
export type BookTicketRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.bookTicketRequestFx>
}
export type BookTicketRequestFail = GenericErrors

export type CancelTicketBookRequest = {
  id: string
}
export type CancelTicketBookRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.cancelTicketBookRequestOk>
}
export type CancelTicketBookRequestFail = GenericErrors

export type FetchCinemasRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchCinemasRequestOk>
}
export type FetchCinemasRequestFail = GenericErrors

export type FetchNearestCinemasRequest = {
  query: string
}
export type FetchNearestCinemasRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchNearestCinemasRequestOk>
}
export type FetchNearestCinemasRequestFail = GenericErrors

export type FetchCinemaRequest = {
  id: number
}
export type FetchCinemaRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchCinemaRequestOk>
}
export type FetchCinemaRequestFail = GenericErrors

export type FetchCinemaSeancesRequest = {
  id: number
  query: string
}
export type FetchCinemaSeancesRequestDone = {
  status: 'ok'
  answer: typed.Get<typeof contract.fetchCinemaSeancesRequestOk>
}
export type FetchCinemaSeancesRequestFail = GenericErrors
