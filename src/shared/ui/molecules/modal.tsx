import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { Overlay } from '../atoms'

type ModalProps = {
  open: boolean
  onClose(): void
  /**
   * tw utility-classnames for dialog panel
   */
  className?: string
  closeOnOverlayClick?: boolean
  initialFocus?: React.MutableRefObject<HTMLElement | null>
  children: React.ReactNode
}

export const Modal = ({ className = '', ...props }: ModalProps) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={props.initialFocus}
        onClose={props.closeOnOverlayClick ? () => {} : props.onClose}
      >
        <Overlay />
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full ${className}`}
              >
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
