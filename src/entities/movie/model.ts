import { attach, createStore } from 'effector'
import { request } from '~shared/api'

import { types } from '~shared/types'

export const $movie = createStore<types.Movie | null>(null)

export const fetchMovieFx = attach({ effect: request.fetchMovieRequestFx })

$movie.on(fetchMovieFx.doneData, (_, { answer }) => answer.data)
