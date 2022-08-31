import { allSettled, fork, serialize } from 'effector'
import { useStoreMap } from 'effector-react'
import { useMemo } from 'react'
import Head from 'next/head'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { MovieTabs } from '~widgets/movie-tabs'
import { movie, MovieOverview } from '~entities/movie'
import { FooterInfo } from '~shared/ui'
import type { NextPageWithLayout } from '~shared/next'
import { request } from '~shared/api'

const PremierePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      <Helmet />
      <main className="flex-grow">
        <MovieOverview />
        <MovieTabs />
      </main>
      <FooterInfo />
    </div>
  )
}

const Helmet = () => {
  const movieName = useStoreMap(movie.model.$movie, (movie) => movie?.title ?? null)
  const title = useMemo(() => {
    if (movieName) {
      return `Купить билет на фильм "${movieName}" в Ташкенте, онлайн.`
    }
    return 'Купить билет на фильм в Ташкенте, онлайн.'
  }, [movieName])

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Надоело стоять в очередях или приходить, когда уже все билеты в кино распроданы? У нас можно купить билеты онлайн!"
      />
      <meta property="og:title" content={title} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const premieres = await request.fetchPremieresRequestFx({ query: '' })

  const paths = premieres.answer.premieres.map(({ id }) => ({
    params: { pid: `${id}` },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const scope = fork()

  await allSettled(movie.model.fetchMovieFx, {
    scope,
    params: { id: +context.params!.pid! },
  })

  if (scope.getState(movie.model.$movie) === null) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialState: serialize(scope),
    },
  }
}

PremierePage.getLayout = (page) => page

export default PremierePage
