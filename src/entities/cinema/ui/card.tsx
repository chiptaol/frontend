import Image from 'next/image'

import { imageSrc } from '~shared/config'

import * as model from '../model'

type Props = {
  cinema: model.NearestCinema
}

export const CinemaCard = ({ cinema }: Props) => {
  return (
    <div className="w-56 flex flex-col space-y-5 flex-shrink-0">
      <div className="relative w-full h-44 rounded-xl bg-yellow-200 overflow-hidden">
        {!!cinema.logo?.path && (
          <Image
            layout="fill"
            className="object-contain absolute inset-0"
            src={imageSrc(cinema.logo.path)}
            alt={cinema.title}
          />
        )}
      </div>
      <div className="flex flex-col space-y-1">
        <h2 className="text-sm leading-4 font-semibold">{cinema.title}</h2>
        <p className="text-xs leading-4 text-violet-100">{cinema.address}</p>
        {!!cinema.distance && (
          <span className="text-xs leading-4">{beautifyDistance(cinema.distance)}</span>
        )}
      </div>
    </div>
  )
}

function beautifyDistance(distance: number) {
  if (distance > 1000) return `${(distance / 1000).toFixed(1)} километров от Вас`

  return `${distance} метров от Вас`
}
