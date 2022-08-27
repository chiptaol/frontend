import { sample } from 'effector'
import { createForm } from 'effector-forms/scope'

import { seance } from '~entities/seance'
import { createDisclosure } from '~shared/lib/disclosure'

import * as lib from './lib'

export const disclosure = createDisclosure()

export const form = createForm({
  fields: lib.fields,
})

export const $isBooked = seance.model.$book.map(Boolean)
export const $isBookingLoading = seance.model.bookTicketFx.pending

export const formValidated = form.formValidated.map((fields) => ({
  email: fields.email!,
  phone: normalizePhone(fields.phoneNumber!),
}))

sample({
  clock: disclosure.close,
  target: [form.reset, seance.model.resetBooked],
})

function normalizePhone(phone: string) {
  const normalized = phone.replace(/\D/g, '')

  return '+' + normalized
}
