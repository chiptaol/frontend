import { useUnit } from 'effector-react'

import { ShowOnly } from '~shared/ui'

import * as model from './model'

export const SeanceLegendWidget = () => {
  return (
    <div className="flex flex-col space-y-2 items-center px-1 w-max py-2 rounded bg-darkBlue-500 mx-auto z-10">
      <HallInfo />
      <Prices />
    </div>
  )
}

const HallInfo = () => {
  const [title, format, left] = useUnit([model.$hallTitle, model.$format, model.$seatsLeft])

  return (
    <div className="flex items-end space-x-2">
      <ShowOnly when={!!title}>
        <h4 className="text-sm font-light text-violet-100">{title}</h4>
      </ShowOnly>
      <ShowOnly when={!!format}>
        <span className="text-xs font-light text-violet-100">{format}</span>
      </ShowOnly>
      <ShowOnly when={left !== null}>
        <p className="text-xs font-light text-violet-100">Осталось мест: {left}</p>
      </ShowOnly>
    </div>
  )
}

const Prices = () => {
  const prices = useUnit(model.$prices)

  return (
    <div className="flex items-center space-x-2">
      <ShowOnly when={!!prices?.vip}>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-blue-100" />
          <span className="text-xs font-light text-violet-100">{prices?.vip}</span>
        </div>
      </ShowOnly>
      <ShowOnly when={!!prices?.standard}>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded bg-violet-100" />
          <span className="text-xs font-light text-violet-100">{prices!.standard}</span>
        </div>
      </ShowOnly>
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 rounded bg-transparent border border-violet-100" />
        <span className="text-xs font-light text-violet-100">Занято</span>
      </div>
    </div>
  )
}
