import { useList, useUnit } from 'effector-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { cinema, CinemaMovieCard } from '~entities/cinema'
import { SeanceHallListItem } from '~entities/seance'
import { DayPicker } from '~shared/ui'

import * as model from './model'

export const CinemaSeancesWidget = () => {
  const { query } = useRouter()
  const mounted = useUnit(model.mounted)

  useEffect(() => {
    if (query.cid && !Array.isArray(query.cid)) {
      mounted(+query.cid)
    }
  }, [query.cid, mounted])

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl leading-7 font-extrabold pl-4">Расписание сеансов</h1>
        <SeanceDayPicker />
      </div>
      <SeancesList />
    </div>
  )
}

const SeancesList = () => {
  const seances = useList(cinema.model.$cinemaMovies, (movie) => (
    <div className="flex flex-col space-y-10 px-4">
      <CinemaMovieCard key={movie.id} movie={movie} />
      {movie.halls.map((hall) => (
        <SeanceHallListItem key={hall.id} seance={hall} />
      ))}
    </div>
  ))

  return <div className="flex flex-col space-y-6">{seances}</div>
}

const SeanceDayPicker = () => {
  const [selected, days, daySelected] = useUnit([
    model.$selectedDay,
    model.$days,
    model.daySelected,
  ])

  return (
    <DayPicker
      days={days}
      selectedDate={selected ?? '-'}
      onDateSelect={(date) => daySelected(date)}
    />
  )
}
