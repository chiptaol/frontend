import { useList, useStoreMap, useUnit } from 'effector-react'
import { useEffect, useRef } from 'react'

import { hallZoomModel } from '~features/hall-zoom'
import { CinemaSeat } from '~entities/cinema'

import * as model from './model'
import { types } from '~shared/types'

export const HallScheme = () => {
  const containerRef = useRef<HTMLElement>(null)
  const [width, setScale] = useUnit([model.$width, hallZoomModel.setScale])

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth
    if (containerWidth) {
      setScale(+((containerWidth - 80) / width).toFixed(1))
    }
  }, [width, setScale])

  return (
    <main
      ref={containerRef}
      className="flex-grow min-h-max overflow-auto py-5 px-10 w-full hide-scrollbar"
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
      {seats}
    </div>
  )
}

const Seat = ({ seat }: { seat: types.Seance['seats'][number] }) => {
  const isSelected = useStoreMap({
    store: model.$selectedSeats,
    keys: [seat.id],
    fn: (selected, [id]) => selected.includes(id),
  })

  const seatClicked = useUnit(model.seatClicked)

  return (
    <CinemaSeat
      onClick={() => seatClicked(seat.id)}
      key={seat.id}
      seat={seat}
      isSelected={isSelected}
    />
  )
}
