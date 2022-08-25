import { useUnit } from 'effector-react'
import { SeanceTimePicker } from '~features/seance'

import { routesMap } from '~shared/routes'
import { PageBackButton } from '~shared/ui'

import * as model from './model'

export const SeanceHeader = () => {
  const { cinemaTitle, movieName, movieId, startDate } = useUnit({
    movieId: model.$movieId,
    movieName: model.$movieName,
    cinemaTitle: model.$cinemaTitle,
    startDate: model.$startDate,
  })

  return (
    <header className="w-full py-6 pl-4 border-b border-b-white border-opacity-10">
      <nav className="flex items-start space-x-8 mb-5">
        <PageBackButton href={routesMap.premiere(movieId ?? 0)} />
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl leading-6 font-semibold max-w-[260px] w-full">
            {movieName}
          </h1>
          <h5 className="text-sm leading-7 font-normal">
            {startDate}, Кинотеатр {cinemaTitle}
          </h5>
        </div>
      </nav>
      <SeanceTimePicker />
    </header>
  )
}
