import { IconButton } from '~shared/ui'

import SeatSvg from './seat.svg'
import BookedSeatSvg from './booked-seat.svg'

export const CinemaSeat = () => {
  return (
    <IconButton
      className="w-9 h-9 hover:bg-white hover:bg-opacity-5 transition-colors"
      aria-label="seat"
    >
      <SeatSvg className="fill-gray-500 border-gray-500" />
    </IconButton>
  )
}
