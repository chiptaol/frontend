import { Disclosure } from '@headlessui/react'
import { useList, useUnit } from 'effector-react'

import { selectSeatModel } from '~features/select-seat'
import { Button, ShowOnly } from '~shared/ui'
import { types } from '~shared/types'

import XIcon from './x.svg'
import ChevronIcon from './chevron-up.svg'
import * as model from './model'
import { BuyTicket, buyTicketModel } from '~features/buy-ticket'

export const SeanceFooter = () => {
  const selectedSeats = useList(selectSeatModel.$selectedSeats, (seat) => (
    <SelectedSeat key={seat.id} seat={seat} />
  ))

  return (
    <footer className="px-4 pt-4 pb-6 w-full border-t border-white border-opacity-10 flex flex-col space-y-3">
      <Cart>
        <div className="flex gap-2 flex-wrap">{selectedSeats}</div>
      </Cart>

      <BuyButton />
      <BuyTicket />
    </footer>
  )
}

const SelectedSeat = ({ seat }: { seat: types.Seance['seats'][number] }) => {
  const seatRemoved = useUnit(model.seatRemoved)

  return (
    <button
      type="button"
      onClick={() => seatRemoved(seat.id)}
      className="flex justify-center items-center space-x-1.5 p-2 bg-[#2A2937] rounded-lg"
    >
      <span className="text-white text-xs leading-[14px]">
        {seat.row} ряд, {seat.place} место
      </span>
      <XIcon className="fill-violet-100" />
    </button>
  )
}

const Cart = ({ children }: { children: React.ReactNode }) => {
  const [amount, isSeatSelected] = useUnit([
    model.$seatsCount,
    model.$isSeatSelected,
  ])
  return (
    <ShowOnly when={isSeatSelected}>
      <Disclosure>
        <Disclosure.Button className="w-full flex justify-between items-center">
          {({ open }) => (
            <>
              <p className="text-base leading-5 font-bold">
                Билетов выбрано: {amount} шт.
              </p>
              <ChevronIcon
                className={
                  open
                    ? 'rotate-180 transition-transform fill-violet-100'
                    : 'transition-transform fill-violet-100'
                }
              />
            </>
          )}
        </Disclosure.Button>
        <Disclosure.Panel>
          <div className="flex gap-2 flex-wrap">{children}</div>
        </Disclosure.Panel>
      </Disclosure>
    </ShowOnly>
  )
}

const BuyButton = () => {
  const [price, isSeatSelected, buyTicket] = useUnit([
    model.$seatsBeautifiedTotalPrice,
    model.$isSeatSelected,
    buyTicketModel.disclosure.open,
  ])
  return (
    <Button onClick={buyTicket} type="button" disabled={!isSeatSelected}>
      {isSeatSelected ? `Купить ${price} сум` : 'Выберите места'}
    </Button>
  )
}
