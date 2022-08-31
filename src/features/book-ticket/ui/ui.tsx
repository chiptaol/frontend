import { useUnit } from 'effector-react'

import { Drawer } from '~shared/ui'

import * as model from '../model'
import { FillUserData } from './fill-user-data'
import { OverviewTicket } from './overview'

export const BookTicket = () => {
  const [open, onClose, isBooked] = useUnit([
    model.disclosure.$open,
    model.disclosure.close,
    model.$isBooked,
  ])

  return (
    <Drawer
      className="bg-darkBlue-500 text-white overflow-auto hide-scrollbar"
      open={open}
      onClose={onClose}
      closeOnOverlayClick={!isBooked}
    >
      {!isBooked ? <FillUserData /> : <OverviewTicket />}
    </Drawer>
  )
}
