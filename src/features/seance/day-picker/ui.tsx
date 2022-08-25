import { useUnit } from 'effector-react'
import { DayPicker } from '~shared/ui'

import * as model from './model'

export const SeanceDayPicker = () => {
  const [selected, days, daySelected] = useUnit([
    model.$selectedDay,
    model.$days,
    model.daySelected,
  ])

  return (
    <DayPicker
      days={days}
      selectedDate={selected ?? '-'}
      onDateSelect={(date) => daySelected(date)}
    />
  )
}
