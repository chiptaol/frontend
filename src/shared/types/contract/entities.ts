import * as typed from 'typed-contracts'

export const actualPremiere = typed.obj({
  id: typed.num,
  title: typed.str,
  release_date: typed.str,
  backdrop_path: typed.str,
})

export const premiere = typed.obj({
  id: typed.num,
  title: typed.str,
  is_premiere: typed.bool,
  poster_path: typed.str,
  genres: typed.arr(typed.str),
})

export const movie = typed.obj({
  id: typed.num,
  title: typed.str.maybe,
  original_title: typed.str.maybe,
  description: typed.str.maybe,
  tagline: typed.str.maybe,
  duration: typed.num.maybe,
  rating: typed.num.maybe,
  age_rating: typed.str.maybe,
  is_premiere: typed.bool.maybe,
  poster_path: typed.str.maybe,
  trailer_path: typed.str.maybe,
  backdrop_path: typed.str.maybe,
  actors: typed.arr(typed.str),
  directors: typed.arr(typed.str),
  countries: typed.arr(typed.obj({ name: typed.str.maybe })),
  genres: typed.arr(typed.str),
})

export const premiereSeance = typed.obj({
  id: typed.num,
  title: typed.str,
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

export const seanceSeat = typed.obj({
  id: typed.num,
  is_available: typed.bool,
  is_vip: typed.bool,
  row: typed.num,
  place: typed.num,
  x: typed.num,
  y: typed.num,
  price: typed.num,
})

export const seance = typed.obj({
  id: typed.num,
  format: typed.str,
  prices: typed.obj({
    vip: typed.num.maybe,
    standard: typed.num.maybe,
  }),
  start_date_time: typed.str,
  seats_left: typed.num,
  movie_id: typed.num,
  seats: typed.arr(seanceSeat),
})

export const book = typed.obj({
  id: typed.num,
  cinema_title: typed.str,
  hall_title: typed.str,
  movie: typed.obj({
    title: typed.str,
    original_title: typed.str,
    poster_path: typed.str,
    genres: typed.arr(typed.str),
  }),
  start_date_time: typed.str,
  seats: typed.arr(
    typed.obj({
      id: typed.num,
      row: typed.num,
      place: typed.num,
      price: typed.num,
    })
  ),
})
