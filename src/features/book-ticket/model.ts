import { attach, createEffect, createEvent, sample } from 'effector'
import { createForm } from 'effector-forms/scope'

import { seance } from '~entities/seance'
import { createDisclosure } from '~shared/lib/disclosure'

import * as lib from './lib'

export const disclosure = createDisclosure()
export const confirmExitDisclosure = createDisclosure()

export const cancelBookingButtonClicked = createEvent()

export const form = createForm({
  fields: lib.fields,
})

const saveUserDataToLocalStorageFx = attach({
  source: form.$values,
  effect: (values) => {
    if (!Object.values(values).every(Boolean)) return

    localStorage.setItem('email', values.email!)
    localStorage.setItem('phone', values.phoneNumber!)
  },
})
const fillFormWithValueFromLocatStorageFx = createEffect(() => {
  const email = localStorage.getItem('email')
  const phoneNumber = localStorage.getItem('phone')

  return lib.validateFormFields(email, phoneNumber)
})

export const $isBooked = seance.model.$book.map(Boolean)
export const $isBookingLoading = seance.model.bookTicketFx.pending

export const formValidated = form.formValidated.map((fields) => ({
  email: fields.email!,
  phone: normalizePhone(fields.phoneNumber!),
}))

sample({
  clock: disclosure.open,
  target: fillFormWithValueFromLocatStorageFx,
})

sample({
  clock: fillFormWithValueFromLocatStorageFx.doneData,
  target: form.setForm,
})

sample({
  clock: disclosure.close,
  target: [form.reset, seance.model.resetBooked],
})

sample({
  clock: formValidated,
  target: saveUserDataToLocalStorageFx,
})

sample({
  clock: cancelBookingButtonClicked,
  target: seance.model.cancelTicketBookFx,
})

sample({
  clock: seance.model.cancelTicketBookFx.done,
  target: [disclosure.close, confirmExitDisclosure.close],
})

function normalizePhone(phone: string) {
  const normalized = phone.replace(/\D/g, '')

  return '+' + normalized
}
