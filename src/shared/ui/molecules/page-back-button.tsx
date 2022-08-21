import Link from 'next/link'

import BackSvg from '~shared/assets/back.svg'

import { IconButton } from '../atoms'

type Props = {
  href: string
}

export const PageBackButton = (props: Props) => {
  return (
    <Link href={props.href}>
      <a>
        <IconButton
          className="p-2 hover:bg-white hover:bg-opacity-5 transition-colors"
          aria-label="back-button"
        >
          <BackSvg />
        </IconButton>
      </a>
    </Link>
  )
}
