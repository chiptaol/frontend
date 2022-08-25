import { Tab } from '@headlessui/react'
import cn from 'classnames'

import { MovieDetails } from '~entities/movie'

export const MovieTabs = () => {
  return (
    <Tab.Group>
      <Tab.List className="mb-3 flex items-center space-x-10 pl-4">
        <TabItem>Расписание</TabItem>
        <TabItem>Описание</TabItem>
      </Tab.List>
      <Tab.Panels className="px-4 pb-5">
        <Tab.Panel>расписание</Tab.Panel>
        <Tab.Panel>
          <MovieDetails />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
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
