import Link from 'next/link'

import { convertToSum } from '~shared/lib/convert-to-sum'
import { formatDate } from '~shared/lib/format-date'
import { routesMap } from '~shared/routes'
import { types } from '~shared/types'

type Props = {
  seance: types.PremiereSeance['halls'][number]
}

export const SeanceHallListItem = (props: Props) => {
  const firstSeanceId = props.seance.seances[0].id
  return (
    <div className="w-full [&:not(:last-of-type)]:border-b border-white border-opacity-10 pb-5">
      <SeanceLinkWrapper id={firstSeanceId}>
        <div className="w-full flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <h5 className="text-base leading-5 font-bold">
              {props.seance.title}
            </h5>
            <span className="text-violet-100 text-base leading-5 font-medium">
              {props.seance.formats.join(', ')}
            </span>
          </div>
          <h4 className="text-base leading-5 font-extrabold">
            от {convertToSum(props.seance.cheapest_price)}
          </h4>
        </div>
      </SeanceLinkWrapper>
      <SeanceLinkWrapper id={firstSeanceId}>
        <p className="text-violet-100 text-base leading-5 font-medium mb-5">
          {props.seance.is_vip ? 'VIP Зал' : 'Стандарт'}
        </p>
      </SeanceLinkWrapper>
      <div className="flex gap-x-3 gap-y-2 w-full">
        {props.seance.seances.map((seance) => (
          <SeanceLinkItem key={seance.id} seance={seance} />
        ))}
      </div>
    </div>
  )
}

const SeanceLinkItem = (props: {
  seance: Props['seance']['seances'][number]
}) => {
  return (
    <Link href={routesMap.seance(props.seance.id)}>
      <a className="px-4 py-3 rounded text-[#252932] text-base font-medium leading-5 bg-yellow-500">
        {formatDate(props.seance.start_date_time, 'HH:mm')}
      </a>
    </Link>
  )
}

const SeanceLinkWrapper = (props: {
  id: number
  children: React.ReactNode
}) => {
  return (
    <Link href={routesMap.seance(props.id)}>
      <a>{props.children}</a>
    </Link>
  )
}
