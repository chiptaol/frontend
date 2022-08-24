import { createStore, is, Store } from 'effector'
import { useStore } from 'effector-react'

type Props = {
  when: boolean | Store<boolean>
  children: React.ReactNode
}

export const ShowOnly = ({ children, when }: Props) => {
  const shouldShow = useStore(is.store(when) ? when : createStore(when))

  if (shouldShow) return <>{children}</>

  return null
}
