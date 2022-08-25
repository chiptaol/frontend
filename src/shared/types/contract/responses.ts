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

export const fetchSeanceRequestOk = typed.obj({
  data: typed.obj({
    movie_title: typed.str,
    cinema_title: typed.str,
    hall_title: typed.str,
    seance: entity.seance,
  }),
  schedule: typed.arr(
    typed.obj({
      id: typed.num,
      start_date_time: typed.str,
      prices: typed.obj({
        standard: typed.num.maybe,
        vip: typed.num.maybe,
      }),
    })
  ),
})
