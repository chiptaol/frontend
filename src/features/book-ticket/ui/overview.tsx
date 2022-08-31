import { useUnit } from 'effector-react'
import { useRef } from 'react'
import Link from 'next/link'

import { SeanceBookedTicket } from '~entities/seance'
import { Button, IconButton, Modal, PromoButton } from '~shared/ui'
import { routesMap } from '~shared/routes'
import { IconBack } from '~shared/assets'

import * as model from '../model'

export const OverviewTicket = () => {
  const [openConfirmExitModal] = useUnit([model.confirmExitDisclosure.open])
  return (
    <div className="flex flex-col w-full h-full space-y-4">
      <div className="w-full px-4 pt-5 flex items-center space-x-10 bg-header">
        <IconButton
          className="p-2 hover:bg-white hover:bg-opacity-5 transition-colors"
          onClick={openConfirmExitModal}
          aria-label="close-drawer"
        >
          <IconBack />
        </IconButton>
        <h1 className="text-xl leading-6 font-extrabold">Покупка билетов</h1>
      </div>
      <div className="flex-grow px-4">
        <SeanceBookedTicket />
      </div>
      <div className="flex flex-col px-4 space-y-4 pb-8">
        <Link href={routesMap.bought}>
          <a className="w-full">
            <PromoButton variant="click" />
          </a>
        </Link>
        <Link href={routesMap.bought}>
          <a className="w-full">
            <PromoButton variant="apelsin" />
          </a>
        </Link>
        <Link href={routesMap.bought}>
          <a className="w-full">
            <PromoButton variant="payme" />
          </a>
        </Link>
      </div>
      <ConfirmExitModal />
    </div>
  )
}

const ConfirmExitModal = () => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const [open, onClose, closeOverview] = useUnit([
    model.confirmExitDisclosure.$open,
    model.confirmExitDisclosure.close,
    model.cancelBookingButtonClicked,
  ])

  return (
    <Modal open={open} onClose={onClose} initialFocus={ref} className="max-w-sm">
      <div className="w-80 sm:max-w-sm sm:w-ful sm:mx-auto l px-4 py-6 flex flex-col space-y-3">
        <h1 className="text-lg leading-5 font-semibold text-center">
          Вы уверены что хотите отменить покупку?
        </h1>
        <div className="flex flex-col items-center space-y-2">
          <Button onClick={onClose} ref={ref}>
            Продолжить покупку
          </Button>
          <Button onClick={closeOverview} theme="secondary">
            Выйти
          </Button>
        </div>
      </div>
    </Modal>
  )
}
