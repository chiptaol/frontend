import { allSettled, fork, serialize } from 'effector'
import { useStoreMap } from 'effector-react'
import { useMemo } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'

import { MovieTabs } from '~widgets/movie-tabs'
import { movie, MovieOverview } from '~entities/movie'
import { FooterInfo, Head } from '~shared/ui'
import { request } from '~shared/api'
import { META } from '~shared/config'
import type { NextPageWithLayout } from '~shared/next'

const PremierePage: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col w-full h-full overflow-y-auto max-w-7xl mx-auto">
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

  return <Head title={title} {...META.premiere} />
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
