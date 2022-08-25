import cn from 'classnames'
import { useList, useStoreMap } from 'effector-react'
import Link from 'next/link'
import { routesMap } from '~shared/routes'

import * as model from './model'

export const SeanceTimePicker = () => {
  const schedule = useList(model.$seancesSchedule, (seance) => (
    <TimePickerItem key={seance.id} seance={seance} />
  ))

  return (
    <div className="flex items-center space-x-2 w-full overflow-x-auto pr-2 hide-scrollbar">
      {schedule}
    </div>
  )
}

type TimePickerItemProps = {
  seance: model.NormalizedSchedule[number]
}

const TimePickerItem = (props: TimePickerItemProps) => {
  const isActive = useStoreMap({
    store: model.$selectedSeance,
    keys: [props.seance.id],
    fn: (selected, [id]) => selected === id,
  })
  return (
    <Link href={routesMap.seance(props.seance.id)}>
      <a>
        <button
          type="button"
          className={cn(
            'flex flex-col justify-center items-center px-2 py-2.5 space-y-1.5 rounded-xl cursor-pointer shrink-0 transition-colors',
            {
              'bg-white bg-opacity-10': isActive,
            }
          )}
        >
          <span className={cn('text-sm leading-4 font-semibold')}>
            {props.seance.price}
          </span>
          <span className={cn('text-sm leading-4 text-gray-300')}>
            {props.seance.startTime}
          </span>
        </button>
      </a>
    </Link>
  )
}
