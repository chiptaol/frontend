import { allSettled, createEvent, fork, sample, serialize } from 'effector'
import Head from 'next/head'
import { useList } from 'effector-react'
import Link from 'next/link'
import type { GetStaticProps, NextPage } from 'next'

import { NearestCinemasWidget } from '~widgets/nearest-cinemas'
import { cinema, CinemaListItem } from '~entities/cinema'
import { FooterInfo } from '~shared/ui'
import { routesMap } from '~shared/routes'

const CinemasPage: NextPage = () => {
  return (
    <>
      <Helmet />
      <div className="w-full xl:h-full xl:flex xl:flex-col">
        <div className="max-w-7xl w-full mx-auto flex flex-col space-y-10 xl:flex-grow xl:mb-4">
          <NearestCinemasWidget />
          <div className="w-full flex flex-col space-y-6 px-4">
            <h1 className="text-2xl leading-7 font-extrabold">Кинотеатры Ташкента</h1>
            <CinemasList />
          </div>
        </div>
        <FooterInfo className="hidden xl:block" />
      </div>
    </>
  )
}

const CinemasList = () => {
  const cinemas = useList(
    cinema.model.$cinemas.map((cinemas) => Object.values(cinemas)),
    (cinema) => (
      <Link href={routesMap.cinema(cinema.id)}>
        <a>
          <CinemaListItem key={cinema.id} id={cinema.id} />
        </a>
      </Link>
    )
  )

  return <div className="w-full flex flex-col space-y-3">{cinemas}</div>
}

const Helmet = () => {
  return (
    <Head>
      <title>Кинотеатры</title>
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

const pageStarted = createEvent()

sample({
  clock: pageStarted,
  target: cinema.model.fetchCinemasFx,
})

export const getStaticProps: GetStaticProps = async () => {
  const scope = fork()

  await allSettled(pageStarted, { scope })

  return {
    props: {
      initialState: serialize(scope),
    },
    revalidate: 60 * 60 * 24,
  }
}

export default CinemasPage
