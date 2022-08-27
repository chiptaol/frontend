import { useUnit } from 'effector-react'
import { Drawer } from '~shared/ui'

import * as model from '../model'
import { FillUserData } from './fill-user-data'
import { OverviewTicket } from './overview'

export const BuyTicket = () => {
  const [open, onClose, formStatus] = useUnit([
    model.disclosure.$open,
    model.disclosure.close,
    model.$formStatus,
  ])
  return (
    <Drawer
      placement="right"
      className="bg-darkBlue-500 text-white"
      open={open}
      onClose={onClose}
    >
      {formStatus === 'fillUserData' ? <FillUserData /> : <OverviewTicket />}
    </Drawer>
  )
}
