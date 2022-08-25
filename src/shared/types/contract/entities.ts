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
