import { useStoreMap } from 'effector-react'
import Image from 'next/image'

import { PageBackButton, ShowOnly } from '~shared/ui'
import { routesMap } from '~shared/routes'
import { imageSrc } from '~shared/config'

import { MovieCard } from './card'
import * as model from '../model'

export const MovieOverview = () => {
  return (
    <div className="relative">
      <PageBackButton
        className="absolute z-20 top-3 left-2"
        href={routesMap.home}
      />
      <div className="relative h-52">
        <div className="absolute inset-0 bg-header z-10" />
        <Backdrop />
      </div>
      <div className="-mt-20 px-4 z-20">
        <MovieCard />
      </div>
    </div>
  )
}

const Backdrop = () => {
  const movieBackdropPath = useStoreMap(
    model.$movie,
    (movie) => movie?.backdrop_path ?? null
  )

  return (
    <ShowOnly when={!!movieBackdropPath}>
      <Image
        layout="fill"
        className="object-cover object-center inset-0 absolute"
        src={imageSrc(movieBackdropPath!)}
        alt=""
      />
    </ShowOnly>
  )
}
