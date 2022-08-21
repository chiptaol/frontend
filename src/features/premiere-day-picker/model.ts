import { createEvent, createStore } from 'effector'
import dayjs from 'dayjs'

import { SERVER_DATE_FORMAT } from '~shared/config'

import * as lib from './lib'

const TODAY = dayjs().format(SERVER_DATE_FORMAT)

export const daySelected = createEvent<string>()

export const $days = createStore(lib.generateFiveDaysAhead())
export const $selectedDay = createStore(TODAY)

$selectedDay.on(daySelected, (_, selected) => selected)
$selectedDay.watch(console.log)
