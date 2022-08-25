import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { useMemo } from 'react'
import { routesMap } from '~shared/routes'
import { types } from '~shared/types'
import { ShowOnly } from '~shared/ui'

import { SeanceHallListItem } from './hall-list-item'

type Props = {
  seancesGroup: types.Seance
}

export const SeanceCinemaListItem = (props: Props) => {
  const seances = useMemo(() => {
    return sliceSeancesIntoTwoPart(props.seancesGroup.halls)
  }, [props.seancesGroup.halls])

  return (
    <div className="flex flex-col w-full space-y-6">
      <Link href={routesMap.cinema(props.seancesGroup.id)}>
        <a className="px-3.5 py-2.5 rounded-lg bg-[#2E2F38] text-lg leading-5 font-bold">
          {props.seancesGroup.title}
        </a>
      </Link>
      {seances.firstPart.map((hall) => (
        <SeanceHallListItem key={hall.id} seance={hall} />
      ))}
      <ShowOnly when={seances.secondPart.length > 0}>
        <Disclosure>
          <Disclosure.Panel>
            {seances.secondPart.map((hall) => (
              <SeanceHallListItem key={hall.id} seance={hall} />
            ))}
          </Disclosure.Panel>
          <Disclosure.Button>
            {({ open }) => <span>{open ? 'Скрыть' : 'Показать еще'}</span>}
          </Disclosure.Button>
        </Disclosure>
      </ShowOnly>
    </div>
  )
}

function sliceSeancesIntoTwoPart(seances: types.Seance['halls']) {
  const firstPart = seances.slice(0, 3)
  const secondPart = seances.slice(3)

  return {
    firstPart,
    secondPart,
  }
}
