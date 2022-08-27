import cn from 'classnames'

import { types } from '~shared/types'

type Props = {
  seat: types.Seance['seats'][number]
  isSelected: boolean
  onClick: () => void
  isDisabled: boolean
}

export const CinemaSeat = ({
  seat,
  isSelected,
  onClick,
  isDisabled,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      style={{ top: seat.y, left: seat.x }}
      className={cn(
        'absolute h-9 text-black-500 font-semibold flex justify-center items-center w-9 transition-colors rounded-md text-opacity-0',
        seatStatus(isSelected, seat.is_vip, !seat.is_available),
        {
          'cursor-not-allowed bg-opacity-50 text-opacity-0 border-opacity-50':
            isDisabled,
          'text-opacity-100 !scale-125': isSelected,
          'sm:hover:text-opacity-100 sm:hover:bg-yellow-500 sm:hover:scale-110':
            !isDisabled,
        }
      )}
    >
      {seat.place}
    </button>
  )
}

const STATUSES = {
  vip: 'bg-blue-100',
  selected: 'bg-yellow-500',
  booked: 'bg-transparent border border-violet-100 cursor-not-allowed',
}

function seatStatus(selected: boolean, vip: boolean, booked: boolean) {
  if (booked) return STATUSES.booked
  if (selected) {
    if (vip) return `${STATUSES.selected} border-4 border-blue-500`
    return `${STATUSES.selected} border-4 border-violet-100`
  }

  if (vip) return STATUSES.vip

  return 'bg-violet-100'
}
