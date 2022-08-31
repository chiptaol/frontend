import { allSettled, attach, createEvent, fork, sample, serialize } from 'effector'
import { useMemo } from 'react'
import { useStoreMap } from 'effector-react'
import Head from 'next/head'
import type { GetServerSideProps } from 'next'

import { SeanceHeader } from '~widgets/seance-header'
import { SeanceLegend } from '~widgets/seance-legend'
import { SeanceFooter } from '~widgets/seance-footer'
import { BookTicketWidget } from '~widgets/book-ticket'
import { HallScheme, hallSchemeModel } from '~widgets/hall-scheme'
import { selectSeatModel } from '~features/select-seat'
import { bookTicketModel } from '~features/book-ticket'
import { HallZoom } from '~features/hall-zoom'
import { cinema, CinemaScreen } from '~entities/cinema'
import { seance } from '~entities/seance'
import type { NextPageWithLayout } from '~shared/next'

const SeancePage: NextPageWithLayout = () => {
  return (
    <>
      <Helmet />
      <div className="w-full h-full flex flex-col relative">
        <SeanceHeader />
        <SeanceLegend />
        <CinemaScreen />
        <HallZoom />
        <HallScheme />
        <SeanceFooter />
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

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta
        name="description"
        content="Надоело стоять в очередях или приходить, когда уже все билеты в кино распроданы? У нас можно купить билеты онлайн!"
      />
      <meta property="og:title" content="Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Chiptaol" />
      <meta
        property="og:description"
        content="Надоело стоять в кассах или приходить, когда уже все билеты распроданы? Для этого не обязательно ехать в кинотеатр, Вы можете купить билеты онлайн у нас."
      />
      <link rel="icon" href="/logo.svg" />
    </Head>
  )
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
