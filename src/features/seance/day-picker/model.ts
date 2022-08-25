import { createEvent, createStore } from 'effector'
import dayjs from 'dayjs'

import { seance } from '~entities/seance'
import { SERVER_DATE_FORMAT } from '~shared/config'

import * as lib from './lib'

export const daySelected = createEvent<string>()

export const $days = createStore<lib.DayFilterItem[]>([])
export const $selectedDay = createStore<string | null>(null)

$days.on(seance.model.fetchPremiereSeancesFx.doneData, (_, { answer }) =>
  lib.normalizeDateArray([...answer.schedule])
)
$selectedDay
  .on(daySelected, (_, selected) => selected)
  .on(
    seance.model.fetchPremiereSeancesFx.done,
    (selected, { params, result }) => {
      if (!params.date) return result.answer.schedule[0] ?? null
      if (selected !== params.date) return params.date

      return selected
    }
  )
