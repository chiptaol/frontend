import { useEffect } from 'react'
import { useList, useUnit } from 'effector-react'
import { useRouter } from 'next/router'
import { Tab } from '@headlessui/react'
import cn from 'classnames'

import { MovieDetails } from '~entities/movie'

import * as model from './model'
import { SeanceDayPicker } from '~features/seance'
import {
  seance,
  SeanceCinemaListItem,
  SeanceHallListItem,
} from '~entities/seance'

export const MovieTabs = () => {
  const mounted = useUnit(model.mounted)
  const { query } = useRouter()

  useEffect(() => {
    if (query.pid && !Array.isArray(query.pid)) {
      mounted(Number(query.pid))
    }
  }, [mounted, query])

  return (
    <Tab.Group>
      <Tab.List className="mb-3 flex items-center space-x-10 pl-4">
        <TabItem>Расписание</TabItem>
        <TabItem>Описание</TabItem>
      </Tab.List>
      <Tab.Panels className="px-4 pb-5">
        <Tab.Panel className="flex flex-col space-y-6">
          <SeanceDayPicker />
          <SeancesList />
        </Tab.Panel>
        <Tab.Panel>
          <MovieDetails />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

const SeancesList = () => {
  const seances = useList(seance.model.$seances, (seance) => (
    <SeanceCinemaListItem key={seance.id} seancesGroup={seance} />
  ))

  return <div className="flex flex-col space-y-8 w-full">{seances}</div>
}

const TabItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab
      className={({ selected }) =>
        cn(
          'text-2xl leading-7 font-extrabold transition-opacity focus:outline-none text-white',
          {
            'opacity-50': !selected,
          }
        )
      }
    >
      {children}
    </Tab>
  )
}
