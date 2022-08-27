import { createStore, sample } from 'effector'
import { createForm } from 'effector-forms/scope'

import { createDisclosure } from '~shared/lib/disclosure'

import * as lib from './lib'

type FormStatus = 'fillUserData' | 'ticketOverview'

export const disclosure = createDisclosure()

export const form = createForm({
  fields: lib.fields,
})

export const $formStatus = createStore<FormStatus>('fillUserData')

sample({
  clock: disclosure.close,
  target: form.reset,
})

sample({
  clock: form.formValidated,
  fn: () => 'ticketOverview' as const,
  target: $formStatus,
})
