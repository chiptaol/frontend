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
