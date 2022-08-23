import { createEvent, createStore } from 'effector'
import { persist, replaceState } from 'effector-storage/query'
import dayjs from 'dayjs'

import { premiere } from '~entities/premiere'
import { SERVER_DATE_FORMAT } from '~shared/config'

import * as lib from './lib'

export const TODAY = dayjs().format(SERVER_DATE_FORMAT)

export const daySelected = createEvent<string>()

export const $days = createStore<lib.DayFilterItem[]>([])
export const $selectedDay = createStore(TODAY)

$days.on(premiere.model.fetchPremieresFx.doneData, (_, { answer }) =>
  lib.normalizeDateArray([...answer.schedule])
)
$selectedDay.on(daySelected, (_, selected) => selected)

persist({
  store: $selectedDay,
  key: 'date',
  method: replaceState,
})
