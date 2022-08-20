import { useState } from 'react'
import cn from 'classnames'

import MovieIcon from './movie.svg'
import CinemaIcon from './cinema.svg'

export const Footer = () => {
  const [activeItem, setActiveItem] = useState('movies')
  return (
    <footer className="w-full flex flex-row bg-[rgba(24, 28, 41, 0.5)] backdrop-blur-3xl">
      <FooterListItem
        onClick={() => setActiveItem('movies')}
        icon={MovieIcon}
        isActive={activeItem === 'movies'}
        title="Премьеры"
      />
      <div className="my-[3px] flex flex-1 ">
        <hr className="w-[1px] h-full border-none bg-white bg-opacity-10" />
      </div>
      <FooterListItem
        onClick={() => setActiveItem('cinemas')}
        icon={CinemaIcon}
        isActive={activeItem === 'cinemas'}
        title="Кинотеатры"
      />
    </footer>
  )
}

type FooterListItemProps = {
  isActive: boolean
  icon: (props: { className: string }) => JSX.Element
  title: string
  onClick: () => void
}

const FooterListItem = (props: FooterListItemProps) => {
  return (
    <div
      onClick={props.onClick}
      className="flex flex-col w-full items-center border-t border-white border-opacity-10 pb-3"
    >
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
            'fill-gray-500': !props.isActive,
          })}
        />
      </div>
      <p
        className={cn('text-xs leading-3 transition-colors', {
          'text-white': props.isActive,
          'text-gray-500': !props.isActive,
        })}
      >
        {props.title}
      </p>
    </div>
  )
}
