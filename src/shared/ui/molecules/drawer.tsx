import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import cn from 'classnames'

import { Overlay } from '../atoms'

type DrawerProps = {
  open: boolean
  onClose(): void
  /**
   * Placement of drawer
   * @default left
   */
  placement?: 'left' | 'right'
  /**
   * tw utility-classnames for dialog panel
   */
  className?: string
  /**
   * if 'true' overlay will be without background color
   * @default false
   */
  transparentOverlay?: boolean
  closeOnOverlayClick?: boolean
  children: React.ReactNode
}

/**
 * Simple drawer component,
 * @remark if you want to render more than one drawer, render by nesting them
 * @see https://github.com/tailwindlabs/headlessui/issues/426
 */

export const Drawer = ({
  placement = 'left',
  className = '',
  ...props
}: DrawerProps) => {
  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onClose}>
        <Overlay />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child as={Fragment} {...animationConfig(placement)}>
                <Dialog.Panel
                  className={cn(
                    `pointer-events-auto relative w-screen max-w-full sm:max-w-md ${className}`
                  )}
                >
                  {props.children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function animationConfig(placement: DrawerProps['placement']) {
  const defaultConfig = {
    enter: 'transform transition ease-in-out duration-500 sm:duration-700',
    enterTo: 'translate-x-0',
    leave: 'transform transition ease-in-out duration-500 sm:duration-700',
    leaveFrom: 'translate-x-0',
  }
  return {
    enterFrom: placement === 'left' ? '-translate-x-full' : 'translate-x-full',
    leaveTo: placement === 'left' ? '-translate-x-full' : 'translate-x-full',
    ...defaultConfig,
  }
}
