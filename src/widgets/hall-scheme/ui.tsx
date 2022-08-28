import { useList, useStoreMap, useUnit } from 'effector-react'
import { useEffect, useRef } from 'react'
import cn from 'classnames'

import { hallZoomModel } from '~features/hall-zoom'
import { selectSeatModel } from '~features/select-seat'
import { CinemaSeat } from '~entities/cinema'
import { types } from '~shared/types'

import * as model from './model'

export const HallScheme = () => {
  const containerRef = useRef<HTMLElement>(null)
  const [width, setScale, mounted, unmounted] = useUnit([
    model.$width,
    hallZoomModel.setScale,
    model.mounted,
    model.unmounted,
  ])

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth
    if (containerWidth) {
      setScale(+((containerWidth - 50) / width).toFixed(1))
    }
  }, [width, setScale])

  useEffect(() => {
    mounted()
    return () => {
      unmounted()
    }
  }, [])

  return (
    <main
      ref={containerRef}
      className="flex-grow overflow-auto py-5 border-x-[25px] border-x-transparent w-full hide-scrollbar"
    >
      <Seats />
    </main>
  )
}

const Seats = () => {
  const seats = useList(model.$seats, (seat) => (
    <Seat key={seat.id} seat={seat} />
  ))

  const [height, width, scale] = useUnit([
    model.$scaledHeight,
    model.$scaledWidth,
    hallZoomModel.$scale,
  ])

  return (
    <div
      style={{
        width,
        height,
        transformOrigin: '0 0',
        transform: `scale(${scale})`,
      }}
      className="relative mx-auto"
    >
      <Rows direction="left" />
      {seats}
    </div>
  )
}

const Rows = ({ direction = 'left' }: { direction: 'left' | 'right' }) => {
  const rows = useList(
    model.$rows.map((rows) => Object.entries(rows)),
    ([row, top]) => (
      <span
        key={row}
        style={{ top }}
        className={cn(
          'absolute w-9 h-9 flex justify-center items-center font-medium text-violet-100',
          {
            'left-0': direction === 'left',
            'right-0': direction === 'right',
          }
        )}
      >
        {row}
      </span>
    )
  )
  return <>{rows}</>
}

const Seat = ({ seat }: { seat: types.Seance['seats'][number] }) => {
  const isSelected = useStoreMap({
    store: selectSeatModel.$selectedSeatsIds,
    keys: [seat.id],
    fn: (selected, [id]) => selected.includes(id),
  })

  const [seatClicked, isDisabled] = useUnit([
    selectSeatModel.seatClicked,
    model.$isBookingLimitExpired,
  ])

  return (
    <CinemaSeat
      isDisabled={isDisabled && !isSelected}
      onClick={() => seatClicked(seat.id)}
      key={seat.id}
      seat={seat}
      isSelected={isSelected}
    />
  )
}
