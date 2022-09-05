import { allSettled, fork, serialize, attach, createEvent, sample } from 'effector'
import { useList } from 'effector-react'
import Link from 'next/link'
import type { GetServerSideProps, NextPage } from 'next'

import { PremiereDayPicker, premiereDayPickerModel } from '~features/premiere-day-picker'
import { premiere, PremiereCard, PremieresSlider } from '~entities/premiere'
import { routesMap } from '~shared/routes'
import { FooterInfo, Head } from '~shared/ui'
import { META } from '~shared/config'

const Home: NextPage = () => {
  return (
    <>
      <Head {...META.default} />
      <div className="w-full xl:flex xl:flex-col xl:h-full">
        <div className="flex flex-col space-y-5 w-full mb-10">
          <div className="max-w-7xl w-full mx-auto">
            <h1 className="text-2xl leading-7 font-extrabold pl-4">Премьеры недели</h1>
          </div>
          <PremieresSlider />
        </div>
        <div className="flex flex-col max-w-7xl w-full space-y-4 mx-auto xl:mb-24 xl:flex-grow">
          <h1 className="text-2xl leading-7 font-extrabold ml-4">В кинотеатрах</h1>
          <div className="flex flex-col space-y-6 w-full">
            <PremiereDayPicker />
            <PremieresList />
          </div>
        </div>
        <FooterInfo className="hidden xl:block" />
      </div>
    </>
  )
}

const PremieresList = () => {
  const premieres = useList(premiere.model.$premieres, (premiere) => (
    <Link href={routesMap.premiere(premiere.id)}>
      <a>
        <PremiereCard key={premiere.id} premiere={premiere} />
      </a>
    </Link>
  ))

  return (
    <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:grid-cols-4 sm:gap-5 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 px-4">
      {premieres}
    </div>
  )
}

const pageStarted = createEvent()

const fetchPremieresFx = attach({
  effect: premiere.model.fetchPremieresFx,
  source: premiereDayPickerModel.$selectedDay,
  mapParams: (_: void, date) => ({ date }),
})

sample({
  clock: pageStarted,
  target: [premiere.model.fetchActualPremieresFx, fetchPremieresFx],
})

sample({
  source: premiereDayPickerModel.$selectedDay,
  target: fetchPremieresFx,
})

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  const scope = fork()

  await allSettled(pageStarted, { scope })

  return {
    props: {
      initialState: serialize(scope),
    },
  }
}

export default Home
