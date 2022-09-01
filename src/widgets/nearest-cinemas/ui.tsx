import { useList, useUnit } from 'effector-react'
import Link from 'next/link'
import { useEffect } from 'react'

import { cinema, CinemaCard } from '~entities/cinema'
import { routesMap } from '~shared/routes'
import { SkeletonGroup } from '~shared/ui'

import * as model from './model'

export const NearestCinemasWidget = () => {
  const handlers = useUnit({
    locationRetrieved: model.locationRetrieved,
    locationRetrieveDenied: model.locationRetrieveDenied,
  })
  const [isDenied, isLocationPermittedOrDenied] = useUnit([
    model.$isDenied,
    model.$isLocationPermittedOrDenied,
  ])
  useEffect(() => {
    if (!isLocationPermittedOrDenied) {
      navigator.geolocation.getCurrentPosition(
        handlers.locationRetrieved,
        handlers.locationRetrieveDenied,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      )
    }
  }, [handlers.locationRetrieved, handlers.locationRetrieveDenied, isLocationPermittedOrDenied])

  if (isDenied) return null

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="pl-4 text-2xl leading-7 font-extrabold">Кинотеатры рядом</h1>
      <CinemasList />
    </div>
  )
}

const CinemasList = () => {
  const cinemas = useList(cinema.model.$nearestCinemas, {
    placeholder: null,
    getKey: (cinema) => cinema.id,
    fn: (cinema) => (
      <Link href={routesMap.cinema(cinema.id)}>
        <a>
          <CinemaCard cinema={cinema} />
        </a>
      </Link>
    ),
  })

  const [isLoading, isLocationPermittedOrDenied] = useUnit([
    model.$isLoading,
    model.$isLocationPermittedOrDenied,
  ])

  const isSkeletonVisible = isLoading || !isLocationPermittedOrDenied

  return (
    <div className="overflow-x-auto w-full overflow-y-hidden hide-scrollbar">
      {isSkeletonVisible && (
        <SkeletonGroup
          className="px-4 space-x-5 !float-left items-start box-border !flex !flex-row"
          skeletonClassName="w-56 flex"
          amount={2}
        />
      )}
      {!isSkeletonVisible && (
        <div className="flex flex-row float-left box-border items-start space-x-5 px-4">
          {cinemas}
        </div>
      )}
    </div>
  )
}
