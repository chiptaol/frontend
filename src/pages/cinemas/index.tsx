import { allSettled, createEvent, fork, sample, serialize } from 'effector'
import { useList } from 'effector-react'
import Link from 'next/link'
import type { GetStaticProps, NextPage } from 'next'

import { NearestCinemasWidget } from '~widgets/nearest-cinemas'
import { cinema, CinemaListItem } from '~entities/cinema'
import { FooterInfo, Head } from '~shared/ui'
import { routesMap } from '~shared/routes'
import { META } from '~shared/config'

const CinemasPage: NextPage = () => {
  return (
    <>
      <Head {...META.cinemas} />
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
