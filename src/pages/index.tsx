import { allSettled, fork, serialize, attach, createEvent, sample } from 'effector'
import Head from 'next/head'
import { useList } from 'effector-react'
import Link from 'next/link'
import type { GetServerSideProps, NextPage } from 'next'

import { PremiereDayPicker, premiereDayPickerModel } from '~features/premiere-day-picker'
import { premiere, PremiereCard, PremieresSlider } from '~entities/premiere'
import { routesMap } from '~shared/routes'

const Home: NextPage = () => {
  return (
    <>
      <Helmet />
      <div className="w-full">
        <div className="flex flex-col space-y-5 w-full mb-10">
          <h1 className="text-2xl leading-7 font-extrabold pl-4">Премьеры недели</h1>
          <PremieresSlider />
        </div>
        <div className="flex flex-col w-full pl-4 space-y-4">
          <h1 className="text-2xl leading-7 font-extrabold">В кинотеатрах</h1>
          <div className="flex flex-col space-y-6 w-full">
            <PremiereDayPicker />
            <PremieresList />
          </div>
        </div>
      </div>
    </>
  )
}

const Helmet = () => {
  return (
    <Head>
      <title>Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента</title>
      <meta name="title" content="Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента" />
      <meta
        name="description"
        content="Надоело стоять в очередях или приходить, когда уже все билеты в кино распроданы? У нас можно купить билеты онлайн!"
      />
      <meta property="og:title" content="Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента" />
      <meta property="og:url" content="https://chiptaol.uz" />
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

const PremieresList = () => {
  const premieres = useList(premiere.model.$premieres, (premiere) => (
    <Link href={routesMap.premiere(premiere.id)}>
      <a>
        <PremiereCard key={premiere.id} premiere={premiere} />
      </a>
    </Link>
  ))

  return (
    <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:grid-cols-4 sm:gap-5 pr-4">{premieres}</div>
  )
}

const pageStarted = createEvent()

const fetchPremieresFx = attach({
  effect: premiere.model.fetchPremieresFx,
  source: premiereDayPickerModel.$selectedDay,
  mapParams: (_: void, date) => ({ date }),
})

sample({
  clock: pageStarted,
  target: [premiere.model.fetchActualPremieresFx, fetchPremieresFx],
})

sample({
  source: premiereDayPickerModel.$selectedDay,
  target: fetchPremieresFx,
})

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const scope = fork()

  await allSettled(pageStarted, { scope })

  return {
    props: {
      initialState: serialize(scope),
    },
  }
}

export default Home
