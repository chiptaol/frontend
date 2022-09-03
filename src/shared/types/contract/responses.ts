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

export const bookTicketRequestFx = entity.book

export const cancelTicketBookRequestOk = typed.obj({
  data: typed.arr(typed.num),
})

export const fetchCinemasRequestOk = typed.obj({
  data: typed.arr(
    typed.obj({
      id: typed.num,
      title: typed.str,
      address: typed.str,
      reference_point: typed.str.maybe,
      logo: typed.obj({
        id: typed.str,
        path: typed.str,
      }).maybe,
    })
  ),
})

export const fetchNearestCinemasRequestOk = typed.obj({
  data: typed.array(
    typed.obj({
      id: typed.num,
      title: typed.str,
      address: typed.str,
      distance: typed.num.maybe,
      logo: typed.obj({
        id: typed.str,
        path: typed.str,
      }).maybe,
    })
  ),
})

export const fetchCinemaRequestOk = typed.obj({
  data: typed.obj({
    id: typed.num,
    title: typed.str,
    address: typed.str,
    logo: typed.obj({
      id: typed.str,
      path: typed.str,
    }).maybe,
    reference_point: typed.str.maybe,
    longitude: typed.num.maybe,
    latitude: typed.num.maybe,
    phone: typed.str,
  }),
})

export const fetchCinemaSeancesRequestOk = typed.obj({
  schedule: typed.arr(typed.str),
  data: typed.arr(
    typed.obj({
      id: typed.number,
      title: typed.str,
      original_title: typed.str,
      rating: typed.num,
      duration: typed.num,
      poster_path: typed.str,
      genres: typed.arr(typed.str),
      halls: typed.arr(
        typed.obj({
          id: typed.num,
          title: typed.str,
          is_vip: typed.bool,
          formats: typed.arr(typed.str),
          cheapest_price: typed.num,
          seances: typed.arr(
            typed.obj({
              id: typed.num,
              start_date_time: typed.str,
            })
          ),
        })
      ),
    })
  ),
})
