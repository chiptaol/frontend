import { useUnit } from 'effector-react'
import { useField, useForm } from 'effector-forms/scope'
import { useCallback } from 'react'

import { Button, IconButton, Input } from '~shared/ui'
import BackSvg from '~shared/assets/back.svg'

import UserIcon from './user.svg'
import PhoneIcon from './phone.svg'

import * as model from '../model'

export const FillUserData = () => {
  const onClose = useUnit(model.disclosure.close)
  return (
    <div className="flex flex-col w-full h-full space-y-2">
      <div className="w-full px-4 py-6 border-b border-b-white border-opacity-10 flex items-start space-x-10 bg-header">
        <IconButton
          className="p-2 hover:bg-white hover:bg-opacity-5 transition-colors"
          onClick={onClose}
          aria-label="close-drawer"
        >
          <BackSvg />
        </IconButton>
        <h1 className="text-xl leading-6 font-extrabold">
          Данные для получения билета
        </h1>
      </div>
      <div className="flex-grow p-4">
        <p className="text-base leading-5 font-medium mb-8">
          Данная информация используется лишь для того, чтобы отправить Вам
          купленные билеты
        </p>
        <Form />
      </div>
    </div>
  )
}

const Form = () => {
  const form = useForm(model.form)

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      form.submit()
    },
    [form]
  )

  return (
    <form onSubmit={onSubmit} className="flex flex-col space-y-4">
      <EmailField />
      <PhoneNumberField />
      <div className="border border-dashed border-darkBlue-400 rounded-xl py-4 px-6">
        <p className="text-base font-semibold">
          Билеты высылаются в электронную почту по указанному адресу
        </p>
      </div>
      <Button type="submit">Продолжить</Button>
    </form>
  )
}

const EmailField = () => {
  const { onChange, value, hasError, errorText } = useField(
    model.form.fields.email
  )
  return (
    <div className="flex flex-col w-full space-y-1">
      <Input
        invalid={hasError()}
        value={value ?? ''}
        onChange={(e) => onChange(e.currentTarget.value)}
        type="email"
        placeholder="Ваша почта"
        LeftIcon={<UserIcon />}
      />
      {hasError() && (
        <span className="ml-5 text-red-500 text-sm leading-4">
          {errorText()}
        </span>
      )}
    </div>
  )
}

const PhoneNumberField = () => {
  const { onChange, value, hasError, errorText } = useField(
    model.form.fields.phoneNumber
  )
  return (
    <div className="flex flex-col w-full space-y-1">
      <Input
        invalid={hasError()}
        type="tel"
        value={value ?? ''}
        onChange={(e) => onChange(e.currentTarget.value)}
        placeholder="Ваш номер телефона"
        LeftIcon={<PhoneIcon />}
      />
      {hasError() && (
        <span className="ml-5 text-red-500 text-sm leading-4">
          {errorText()}
        </span>
      )}
    </div>
  )
}
