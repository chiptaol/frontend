import { useStoreMap } from 'effector-react'
import Image from 'next/image'

import { IconRight } from '~shared/assets'
import { imageSrc } from '~shared/config'
import { ShowOnly } from '~shared/ui'

import * as model from '../model'

type Props = {
  id: number
}

export const CinemaListItem = (props: Props) => {
  const cinema = useStoreMap({
    store: model.$cinemas,
    keys: [props.id],
    defaultValue: null,
    fn: (cinemas, [id]) => cinemas[id],
  })

  if (!cinema) return null

  return (
    <div className="w-full flex items-start justify-between pl-3 pb-3 pr-5 pt-2.5 rounded-xl bg-darkBlue-600">
      <div className="w-full flex items-start space-x-5">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-yellow-500 flex-shrink-0">
          {!!cinema.logo?.path && (
            <Image
              className="absolute inset-0 object-cover"
              layout="fill"
              src={imageSrc(cinema.logo.path)}
              alt={cinema.title}
            />
          )}
        </div>
        <div className="flex flex-col space-y-1.5">
          <h2 className="text-base leading-5 font-semibold">{cinema.title}</h2>
          <p className="text-xs leading-[18px]">{cinema.address}</p>
          <ShowOnly when={!!cinema.reference_point}>
            <span className="text-xs leading-[18px] text-violet-100">
              {cinema.reference_point!}
            </span>
          </ShowOnly>
        </div>
      </div>
      <IconRight />
    </div>
  )
}
