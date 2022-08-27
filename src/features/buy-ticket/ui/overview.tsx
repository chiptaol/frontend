import { useUnit } from 'effector-react'

import { SeanceBookedTicket } from '~entities/seance'
import { IconButton, PromoButton } from '~shared/ui'
import BackSvg from '~shared/assets/back.svg'

import * as model from '../model'
import Link from 'next/link'
import { routesMap } from '~shared/routes'

export const OverviewTicket = () => {
  const [onClose] = useUnit([model.disclosure.close])
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="w-full px-4 pt-6 pb-2 flex items-center space-x-10 bg-header">
        <IconButton
          className="p-2 hover:bg-white hover:bg-opacity-5 transition-colors"
          onClick={onClose}
          aria-label="close-drawer"
        >
          <BackSvg />
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
    </div>
  )
}
