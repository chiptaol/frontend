import { useUnit } from 'effector-react'
import { useRouter } from 'next/router'
import { SeanceTimePicker } from '~features/seance'

import { routesMap } from '~shared/routes'
import { PageBackButton } from '~shared/ui'

import * as model from './model'

export const SeanceHeaderWidget = () => {
  const { cinemaTitle, movieName, startDate } = useUnit({
    movieName: model.$movieName,
    cinemaTitle: model.$cinemaTitle,
    startDate: model.$startDate,
  })

  return (
    <header className="w-full py-5 pl-4 border-b border-b-white border-opacity-10">
      <nav className="flex items-start space-x-8 mb-2">
        <BackButton />
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl leading-6 font-semibold max-w-[260px] w-full">{movieName}</h1>
          <h5 className="text-sm leading-7 font-normal">
            {startDate}, Кинотеатр {cinemaTitle}
          </h5>
        </div>
      </nav>
      <SeanceTimePicker />
    </header>
  )
}

const BackButton = () => {
  const { query } = useRouter()
  const movieId = useUnit(model.$movieId) ?? 0

  const href =
    query.from && typeof query.from === 'string' ? query.from : routesMap.premiere(movieId)

  return <PageBackButton href={href} />
}
