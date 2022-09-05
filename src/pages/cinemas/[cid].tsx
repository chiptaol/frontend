import { useStoreMap } from 'effector-react'
import { allSettled, fork, serialize } from 'effector'
import { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { CinemaSeancesWidget } from '~widgets/cinema-seances'
import { cinema, CinemaOverview } from '~entities/cinema'
import { request } from '~shared/api'
import { FooterInfo, Head, PageBackButton } from '~shared/ui'
import { routesMap } from '~shared/routes'
import { META } from '~shared/config'
import type { NextPageWithLayout } from '~shared/next'

const CinemaPage: NextPageWithLayout = () => {
  return (
    <>
      <Helmet />
      <div className="w-full h-full flex flex-col overflow-y-auto">
        <main className="max-w-7xl w-full flex-grow mx-auto">
          <div className="flex w-full items-start space-x-8 px-5 pt-6 bg-header mb-6">
            <PageBackButton href={routesMap.cinemas} />
            <h1 className="text-xl leading-6 font-extrabold">Информация о кинотеатре</h1>
          </div>
          <CinemaOverview />
          <CinemaSeancesWidget />
        </main>
        <FooterInfo />
      </div>
    </>
  )
}

const Helmet = () => {
  const cinemaTitle = useStoreMap(cinema.model.$cinema, (cinema) => cinema?.title ?? null)

  const title = useMemo(() => {
    if (cinemaTitle) {
      return `Купить билеты онлайн в кинотеатре "${cinemaTitle}".`
    }
    return 'Купить билеты онлайн в кинотеатре Ташкента.'
  }, [cinemaTitle])

  return <Head title={title} {...META.cinema} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { answer } = await request.fetchCinemasRequestFx()

  const paths = answer.data.map((cinema) => ({ params: { cid: `${cinema.id}` } }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const scope = fork()

  await allSettled(cinema.model.fetchCinemaFx, { scope, params: { id: +context.params!.cid! } })

  if (scope.getState(cinema.model.$cinema) === null) {
    return { notFound: true }
  }

  return {
    props: {
      initialState: serialize(scope),
    },
    revalidate: 60 * 60 * 24,
  }
}

CinemaPage.getLayout = (page) => page

export default CinemaPage
