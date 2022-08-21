import Link from 'next/link'

import { routesMap } from '~shared/routes'

import { Logo } from '../atoms'

export const Header = () => {
  return (
    <header className="flex items-end space-x-5 px-4 pb-4 border-b border-white border-opacity-10 relative">
      <div className="absolute inset-0 bg-header" />
      <Link href={routesMap.home}>
        <a className="z-20">
          <Logo />
        </a>
      </Link>
      <h1 className="text-yellow-500 font-bold text-base leading-5">
        Онлайн-покупка
        <br />
        билетов в кино
      </h1>
    </header>
  )
}
