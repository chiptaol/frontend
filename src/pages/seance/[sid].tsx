import { allSettled, attach, createEvent, fork, sample, serialize } from 'effector'
import { useMemo } from 'react'
import { useStoreMap } from 'effector-react'
import type { GetServerSideProps } from 'next'

import { SeanceHeaderWidget } from '~widgets/seance-header'
import { SeanceLegendWidget } from '~widgets/seance-legend'
import { SeanceFooterWidget } from '~widgets/seance-footer'
import { BookTicketWidget } from '~widgets/book-ticket'
import { HallScheme, hallSchemeModel } from '~widgets/hall-scheme'
import { selectSeatModel } from '~features/select-seat'
import { bookTicketModel } from '~features/book-ticket'
import { HallZoom } from '~features/hall-zoom'
import { cinema, CinemaScreen } from '~entities/cinema'
import { seance } from '~entities/seance'
import { Head } from '~shared/ui'
import { META } from '~shared/config'
import type { NextPageWithLayout } from '~shared/next'

const SeancePage: NextPageWithLayout = () => {
  return (
    <>
      <Helmet />
      <div className="max-w-7xl w-full h-full flex flex-col relative mx-auto">
        <SeanceHeaderWidget />
        <SeanceLegendWidget />
        <CinemaScreen />
        <HallZoom />
        <HallScheme />
        <SeanceFooterWidget />
        <BookTicketWidget />
      </div>
    </>
  )
}

const Helmet = () => {
  const { movieName, cinemaTitle } = useStoreMap(seance.model.$seance, (seance) => ({
    movieName: seance?.movie_title ?? null,
    cinemaTitle: seance?.cinema_title ?? null,
  }))

  const title = useMemo(() => {
    if (movieName && cinemaTitle) {
      return `Купить билет на фильм "${movieName}" в ${cinemaTitle}.`
    }
    return 'Купить билет на фильм в Ташкенте.'
  }, [movieName, cinemaTitle])

  return <Head title={title} {...META.seance} />
}

const pageStarted = createEvent<{ id: number }>()

const fetchSeanceFx = attach({ effect: seance.model.fetchSeanceFx })

sample({
  clock: pageStarted,
  target: fetchSeanceFx,
})

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const scope = fork({
    values: [
      [selectSeatModel.$selectedSeatsIds, []],
      [bookTicketModel.disclosure.$open, false],
      [seance.model.$book, null],
    ],
  })

  await allSettled(pageStarted, {
    scope,
    params: { id: +context.params!.sid! },
  })

  if (scope.getState(seance.model.$seance) === null) {
    return {
      notFound: true,
    }
  }

  const seats = scope.getState(seance.model.$seance)?.seance.seats ?? []

  const seatsX = seats.map((seat) => seat.x) ?? []
  const containerWidth = Math.max(...seatsX) + cinema.config.SEAT_WIDTH
  const containerHeight = seats[seats.length - 1].y + cinema.config.SEAT_WIDTH

  await allSettled(hallSchemeModel.heightAndWidthCalculated, {
    scope,
    params: { width: containerWidth, height: containerHeight },
  })

  return {
    props: {
      initialState: serialize(scope),
      id: +context.params!.sid!,
    },
  }
}

SeancePage.getLayout = (page) => page

export default SeancePage
