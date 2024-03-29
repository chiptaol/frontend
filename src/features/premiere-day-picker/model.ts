import { createEvent, createStore } from 'effector'

import { premiere } from '~entities/premiere'

import * as lib from './lib'

export const daySelected = createEvent<string>()

export const $days = createStore<lib.DayFilterItem[]>([])
export const $selectedDay = createStore<null | string>(null)

$days.on(premiere.model.fetchPremieresFx.doneData, (_, { answer }) =>
  lib.normalizeDateArray([...answer.schedule])
)
$selectedDay
  .on(daySelected, (_, selected) => selected)
  .on(premiere.model.fetchPremieresFx.done, (selected, { params, result }) => {
    if (!params.date) return result.answer.schedule[0] ?? null
    if (selected !== params.date) return params.date

    return selected
  })
