import { combine, createEvent, merge, restore, sample } from 'effector'

import { cinema } from '~entities/cinema'

export const locationRetrieved = createEvent<GeolocationPosition>()
export const locationRetrieveDenied = createEvent()

const locationPermissionChanged = merge([locationRetrieveDenied, locationRetrieved])

export const $isLoading = cinema.model.fetchNearesCinemasFx.pending
export const $isDenied = restore(
  locationRetrieveDenied.map(() => true),
  false
)
export const $isLocationPermittedOrDenied = restore(
  locationPermissionChanged.map(() => true),
  false
)

export const $status = combine(
  $isLocationPermittedOrDenied,
  $isLoading,
  cinema.model.$nearestCinemas,
  (is, pending, cinemas) => {
    if (pending) return 'pending'
    if (is && cinemas.length === 0) return 'empty'
    return 'ready'
  }
)

sample({
  clock: locationRetrieved,
  fn: ({ coords }) => ({ latitude: coords.latitude, longitude: coords.longitude }),
  target: cinema.model.fetchNearesCinemasFx,
})
