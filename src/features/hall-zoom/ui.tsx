import { useUnit } from 'effector-react'

import * as model from './model'

export const HallZoom = () => {
  const [zoomIn, zoomOut] = useUnit([model.zoomIn, model.zoomOut, model.$scale])

  return (
    <ul className="absolute top-1/2 right-5 flex flex-col z-10 space-y-1">
      <ZoomButton onClick={() => zoomIn()}>+</ZoomButton>
      <ZoomButton onClick={() => zoomOut()}>-</ZoomButton>
    </ul>
  )
}

const ZoomButton = (props: {
  onClick: () => void
  children: React.ReactNode
}) => {
  return (
    <li>
      <button
        className="h-8 w-8 rounded-sm bg-white text-black-500 flex justify-center items-center text-xl font-medium shadow-lg"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </li>
  )
}
