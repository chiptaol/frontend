import Link from 'next/link'
import { useRouter } from 'next/router'
import cn from 'classnames'

import { routesMap } from '~shared/routes'

import MovieIcon from './movie.svg'
import CinemaIcon from './cinema.svg'

export const Footer = () => {
  const location = useRouter().pathname
  return (
    <footer className="w-full flex flex-row bg-[rgba(24, 28, 41, 0.5)] backdrop-blur-2xl">
      <Link href={routesMap.home}>
        <a className="w-full">
          <FooterListItem
            icon={MovieIcon}
            isActive={!location.includes('cinemas')}
            title="Премьеры"
          />
        </a>
      </Link>
      <div className="my-[3px] flex flex-1 ">
        <hr className="w-[1px] h-full border-none bg-white bg-opacity-10" />
      </div>
      <Link href={routesMap.cinemas}>
        <a className="w-full">
          <FooterListItem
            icon={CinemaIcon}
            isActive={location.includes('cinemas')}
            title="Кинотеатры"
          />
        </a>
      </Link>
    </footer>
  )
}

type FooterListItemProps = {
  isActive: boolean
  icon: (props: { className: string }) => JSX.Element
  title: string
}

const FooterListItem = (props: FooterListItemProps) => {
  return (
    <div className="flex flex-col w-full items-center border-t border-white border-opacity-10 pb-3">
      <div className="flex flex-col space-y-2.5 w-14 items-center mb-2">
        <hr
          className={cn(
            'transition-colors w-full h-[3px] rounded-[3px] border-none',
            {
              'bg-white': props.isActive,
              'bg-transparent': !props.isActive,
            }
          )}
        />
        <props.icon
          className={cn('transition-colors', {
            'fill-white': props.isActive,
            'fill-gray-400': !props.isActive,
          })}
        />
      </div>
      <p
        className={cn('text-xs leading-3 transition-colors', {
          'text-white': props.isActive,
          'text-gray-400': !props.isActive,
        })}
      >
        {props.title}
      </p>
    </div>
  )
}
