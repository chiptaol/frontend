import { useUnit } from 'effector-react'

import { ShowOnly } from '~shared/ui'

import * as model from '../model'

export const MovieDetails = () => {
  const movie = useUnit(model.$movie)

  if (!movie) return null

  return (
    <div className="flex flex-col space-y-5">
      <ShowOnly when={!!movie.description}>
        <p className="text-base leading-5">{movie.description!}</p>
      </ShowOnly>
      <div className="grid grid-cols-[max-content_1fr] gap-y-4 gap-x-8">
        <ListItem
          label="Страна"
          content={movie.countries.map((c) => c.name).join(', ') || '-'}
        />
        <ListItem
          label="Режиссер"
          content={movie.directors.join(', ') || '-'}
        />
        <ListItem label="В ролях" content={movie.actors.join(', ') || '-'} />
        <ListItem label="Возраст" content={movie.age_rating ?? '-'} />
      </div>
    </div>
  )
}

type ListItemProps = {
  label: string
  content: string
}

const ListItem = (props: ListItemProps) => {
  return (
    <>
      <span className="text-white opacity-50 text-base leading-5">
        {props.label}
      </span>
      <p className="text-base leading-6">{props.content}</p>
    </>
  )
}
