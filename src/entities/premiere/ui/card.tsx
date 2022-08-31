import Image from 'next/image'

import { imageSrc } from '~shared/config'
import { types } from '~shared/types'

type Props = {
  premiere: types.Premiere
}

export const PremiereCard = ({ premiere }: Props) => {
  const genre = premiere.genres[0] ?? null
  return (
    <div className="flex flex-col space-y-2.5 h-full justify-between">
      <div className="w-full relative h-36 xs:h-48 sm:h-60 rounded-xl overflow-hidden">
        <Image
          layout="fill"
          className="object-cover object-top absolute inset-0"
          src={imageSrc(premiere.poster_path)}
          sizes={'(min-width: 640px) 25vw, (max-width: 768px) 15vw, 33vw'}
          alt="premiere_poster"
        />
        {premiere.is_premiere && (
          <span className="bg-orange-600 text-white text-xs leading-3 font-medium px-1.5 py-1 rounded-xl absolute top-1 right-1">
            Премьера
          </span>
        )}
      </div>
      <div className="flex flex-col space-y-2 flex-grow justify-center">
        <h3 className="text-xs leading-[14px] font-semibold">
          {premiere.title}
        </h3>
        {genre && <p className="text-xs leading-4 text-violet-100">{genre}</p>}
      </div>
    </div>
  )
}
