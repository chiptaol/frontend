import cn from 'classnames'

type Props = {
  isActive: boolean
}

export const SeanceTimeListItem = (props: Props) => {
  return (
    <button
      className={cn(
        'px-2 py-2.5 rounded-xl flex items-center justify-center shrink-0',
        {
          'bg-white bg-opacity-10': props.isActive,
        }
      )}
    >
      <li className="flex flex-col space-y-1.5">
        <p className="text-sm leading-4 font-semibold">45 000</p>
        <span className="text-sm leading-4 text-gray-300">12:00</span>
      </li>
    </button>
  )
}
