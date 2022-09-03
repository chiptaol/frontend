import Image from 'next/image'

import { imageSrc } from '~shared/config'
import { ShowOnly } from '~shared/ui'
import { IconStar } from '~shared/assets'

import * as model from '../model'

type Props = {
  movie: model.CinemaMovie
}

export const CinemaMovieCard = ({ movie }: Props) => {
  return (
    <div className="flex items-end space-x-5">
      <div className="rounded-xl h-44 w-32 overflow-hidden relative flex-shrink-0">
        <Poster posterPath={movie.poster_path ?? null} />
      </div>
      <div className="flex flex-col space-y-2 z-20">
        <ShowOnly when={!!movie.original_title}>
          <h4 className="text-sm leading-4 font-semibold text-gray-400">{movie.original_title!}</h4>
        </ShowOnly>
        <ShowOnly when={!!movie.title}>
          <h4 className="text-lg leading-4 font-semibold">{movie.title!}</h4>
        </ShowOnly>
        <ShowOnly when={!!movie.rating}>
          <div className="flex items-center space-x-1">
            <IconStar />
            <span className="text-[10px] font-medium leading-[1]">{movie.rating!.toFixed(1)}</span>
          </div>
        </ShowOnly>
        <ShowOnly when={movie.genres.length > 0}>
          <p className="text-xs leading-[14px] text-violet-100">{movie.genres.join(', ')}</p>
        </ShowOnly>
        <ShowOnly when={!!movie.duration}>
          <p className="text-xs leading-[14px] text-violet-100">
            {beautifyDuration(movie.duration!)}
          </p>
        </ShowOnly>
      </div>
    </div>
  )
}

//TODO merge this card with movie entity card

const Poster = (props: { posterPath: string | null }) => {
  if (!props.posterPath) {
    return <div className="bg-blue-900 absolute inset-0" />
  }

  return (
    <Image
      layout="fill"
      className="object-cover object-top absolute inset-0 z-10"
      quality={100}
      src={imageSrc(props.posterPath)}
      alt="movie_poster"
    />
  )
}

function beautifyDuration(duration: number) {
  const hours = Math.floor(duration / 60)
  const beautified: string[] = []

  if (duration > 0) beautified.push(`${hours}ч`)
  const minutes = duration - hours * 60

  if (minutes > 0) beautified.push(`${minutes} мин`)

  return beautified.join(' ')
}
