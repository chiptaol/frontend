import cn from 'classnames'
import { useMemo } from 'react'

import { types } from '~shared/types'

type Props = {
  seat: types.Seance['seats'][number]
  isSelected: boolean
  onClick: () => void
}

export const CinemaSeat = ({ seat, isSelected, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      style={{ top: seat.y, left: seat.x }}
      className={cn(
        'absolute h-9 text-black flex justify-center items-center w-9 transition-colors rounded-md',
        {
          'bg-transparent border border-violet-100 cursor-not-allowed':
            !seat.is_available,
          'bg-blue-100': seat.is_available && seat.is_vip,
          'bg-yellow-500': seat.is_available && isSelected,
          'bg-violet-100': seat.is_available && !seat.is_vip && !isSelected,
        }
      )}
    >
      {isSelected && seat.place}
    </button>
  )
}
