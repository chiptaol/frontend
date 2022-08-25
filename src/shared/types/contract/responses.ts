import * as typed from 'typed-contracts'

import * as entity from './entities'

export const fetchActualPremieresRequestOk = typed.obj({
  data: typed.arr(entity.actualPremiere),
})

export const fetchPremieresRequestOk = typed.obj({
  schedule: typed.arr(typed.str),
  premieres: typed.arr(entity.premiere),
})

export const fetchMovieRequestOk = typed.obj({
  data: entity.movie,
})
export const fetchMovieRequestNotFound = typed.nul

export const fetchSeancesRequestOk = typed.obj({
  data: typed.arr(entity.premiereSeance),
  schedule: typed.arr(typed.str),
})
