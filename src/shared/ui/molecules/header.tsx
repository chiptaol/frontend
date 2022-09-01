import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { routesMap } from '~shared/routes'

import { Logo } from '../atoms'

export const Header = () => {
  return (
    <header className="max-w-7xl w-full flex items-center justify-between mx-auto px-4 pb-4 border-b border-white border-opacity-10 relative xl:border-none">
      <div className="absolute inset-0 bg-header" />
      <div className="w-max flex items-center space-x-5 ">
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
      </div>
      <div className="items-center space-x-16 z-10 hidden xl:flex">
        <NavLink href={routesMap.home}>
          {({ active }) => (
            <a
              className={cn('text-base leading-3 font-bold', {
                'pointer-events-none text-white': active,
                'opacity-50': !active,
              })}
            >
              Премьеры
            </a>
          )}
        </NavLink>
        <NavLink href={routesMap.cinemas}>
          {({ active }) => (
            <a
              className={cn('text-base leading-3 font-bold', {
                'pointer-events-none': active,
                'opacity-50': !active,
              })}
            >
              Кинотеатры
            </a>
          )}
        </NavLink>
      </div>
    </header>
  )
}

const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode | ((prop: { active: boolean }) => React.ReactNode)
}) => {
  const { pathname } = useRouter()
  const active = pathname === href
  return (
    <Link className={active ? 'pointer-events-none' : ''} href={href}>
      {typeof children === 'function' ? children({ active }) : children}
    </Link>
  )
}
