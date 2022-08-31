import * as yup from 'yup'

import { createRule } from '~shared/lib/create-rule'

export const fields = {
  email: {
    init: null as null | string,
    rules: [
      createRule({
        name: 'email',
        schema: yup
          .string()
          .transform((s: string | null) => (s ? s.trim() : s))
          .nullable()
          .email()
          .required('Введите почту, пожалуйста.'),
      }),
    ],
  },
  phoneNumber: {
    init: null as string | null,
    rules: [
      createRule({
        name: 'phoneNumber',
        schema: yup
          .string()
          .transform((s: string | null) => (s ? s.trim() : s))
          .nullable()
          .test(function (value) {
            if (!value)
              return this.createError({
                message: 'Введите номер телефона, пожалуйста.',
              })
            if (typeof value === 'string') {
              const phoneNumber = value.replace(/\D/g, '')
              if (phoneNumber.length === 12) return true
              else
                return this.createError({
                  message: 'Неправильный номер телефона.',
                })
            }

            return this.createError({ message: 'Неправильный номер телефона.' })
          })
          .required('Введите номер телефона, пожалуйста.'),
      }),
    ],
  },
}

export function validateFormFields(email: string | null, phoneNumber: string | null) {
  return yup
    .object()
    .shape({
      email: yup
        .string()
        .transform((s) => (s ? s.trim() : s))
        .nullable()
        .email()
        .required(),
      phoneNumber: yup
        .string()
        .transform((s: string | null) => (s ? s.trim() : s))
        .nullable()
        .test(function (value) {
          if (!value)
            return this.createError({
              message: 'Введите номер телефона, пожалуйста.',
            })
          if (typeof value === 'string') {
            const phoneNumber = value.replace(/\D/g, '')
            if (phoneNumber.length === 12) return true
            else
              return this.createError({
                message: 'Неправильный номер телефона.',
              })
          }

          return this.createError({ message: 'Неправильный номер телефона.' })
        })
        .required(),
    })
    .validateSync({ email, phoneNumber })
}
