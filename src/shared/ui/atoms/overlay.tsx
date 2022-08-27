import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

type Props = {
  className?: string
}

export const Overlay = ({ className = '' }: Props) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-in-out duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${className}`}
      />
    </Transition.Child>
  )
}
