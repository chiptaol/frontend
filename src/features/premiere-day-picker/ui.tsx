import cn from 'classnames'

export const PremiereDayPicker = () => {
  return (
    <div className="flex items-center space-x-2 w-full overflow-x-auto pr-2">
      <DayPickerItem date={12} day="пт" isToday isActive={false} />
      <DayPickerItem date={13} day="чт" isToday={false} isActive={false} />
      <DayPickerItem date={14} day="сб" isToday={false} isActive={true} />
      <DayPickerItem date={15} day="вс" isToday={false} isActive={false} />
      <DayPickerItem date={16} day="пн" isToday={false} isActive={false} />
      <DayPickerItem date={17} day="вт" isToday={false} isActive={false} />
      <DayPickerItem date={18} day="ср" isToday={false} isActive={false} />
    </div>
  )
}

type DayPickerItemProps = {
  date: number
  day: string
  isActive: boolean
  isToday: boolean
}

const DayPickerItem = (props: DayPickerItemProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex flex-col justify-center items-center h-14 w-20 space-y-1.5 rounded-xl cursor-pointer shrink-0',
        {
          'bg-black bg-opacity-30': props.isActive,
        }
      )}
    >
      <span
        className={cn('text-base leading-5 font-semibold', {
          'font-extrabold': props.isToday,
        })}
      >
        {props.date}
      </span>
      <span
        className={cn('text-base leading-5', {
          'text-gray-400': !props.isToday,
        })}
      >
        {props.day}
      </span>
    </button>
  )
}
