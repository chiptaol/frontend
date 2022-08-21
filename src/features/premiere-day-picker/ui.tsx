import cn from 'classnames'
import { useList, useStoreMap, useUnit } from 'effector-react'

import * as model from './model'

export const PremiereDayPicker = () => {
  const days = useList(model.$days, ({ day, whichDay, formatted }) => (
    <DayPickerItem
      key={whichDay}
      date={whichDay}
      day={day}
      formatted={formatted}
    />
  ))
  return (
    <div className="flex items-center space-x-2 w-full overflow-x-auto pr-2 hide-scrollbar">
      {days}
    </div>
  )
}

type DayPickerItemProps = {
  date: string
  day: string
  formatted: string
}

const DayPickerItem = (props: DayPickerItemProps) => {
  const daySelected = useUnit(model.daySelected)
  const isActive = useStoreMap({
    store: model.$selectedDay,
    keys: [props.formatted],
    fn: (selected, [formatted]) => selected === formatted,
  })
  return (
    <button
      onClick={() => daySelected(props.formatted)}
      type="button"
      className={cn(
        'flex flex-col justify-center items-center px-2 py-2.5 space-y-1.5 rounded-xl cursor-pointer shrink-0 transition-colors',
        {
          'bg-white bg-opacity-10': isActive,
        }
      )}
    >
      <span className={cn('text-sm leading-4 font-semibold')}>
        {props.date}
      </span>
      <span className={cn('text-sm leading-4 text-gray-300')}>{props.day}</span>
    </button>
  )
}
