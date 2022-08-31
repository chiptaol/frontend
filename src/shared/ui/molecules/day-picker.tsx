import cn from 'classnames'

type Props = {
  days: Array<{ dayOrDate: string; weekDay: string; formatted: string }>
  selectedDate: string
  onDateSelect: (date: string) => void
}

export const DayPicker = (props: Props) => {
  return (
    <div className="flex w-full space-x-2 pr-4 overflow-x-auto hide-scrollbar">
      {props.days.map((day) => (
        <DayPickerItem
          key={day.dayOrDate}
          day={day}
          isActive={props.selectedDate === day.formatted}
          onClick={() => props.onDateSelect(day.formatted)}
        />
      ))}
    </div>
  )
}

type DayPickerItemProps = {
  day: Props['days'][number]
  isActive: boolean
  onClick: () => void
}

const DayPickerItem = (props: DayPickerItemProps) => {
  return (
    <button
      onClick={props.onClick}
      type="button"
      className={cn(
        'flex flex-col justify-center items-center px-2 py-2.5 space-y-1.5 rounded-xl cursor-pointer shrink-0 transition-colors',
        {
          'bg-white bg-opacity-10': props.isActive,
        }
      )}
    >
      <span className={cn('text-sm leading-4 font-semibold')}>{props.day.dayOrDate}</span>
      <span className={cn('text-sm leading-4 text-gray-300')}>{props.day.weekDay}</span>
    </button>
  )
}
