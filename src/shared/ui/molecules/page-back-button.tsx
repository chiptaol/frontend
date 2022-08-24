import Link from 'next/link'

import BackSvg from '~shared/assets/back.svg'

import { IconButton } from '../atoms'

type Props = {
  href: string
  className?: string
}

export const PageBackButton = ({ className = '', ...props }: Props) => {
  return (
    <Link href={props.href}>
      <a>
        <IconButton
          className={`p-2 hover:bg-white hover:bg-opacity-5 transition-colors ${className}`}
          aria-label="back-button"
        >
          <BackSvg />
        </IconButton>
      </a>
    </Link>
  )
}
