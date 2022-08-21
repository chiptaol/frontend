import Head from 'next/head'
import { SeanceTimeListItem } from '~entities/seance'

import { NextPageWithLayout } from '~shared/next'
import { routesMap } from '~shared/routes'
import { PageBackButton } from '~shared/ui'

const SeancePage: NextPageWithLayout = () => {
  return (
    <>
      {/* //TODO pass seance title to head */}
      <Head>
        <title>Сеанс</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="w-full h-full">
        <Header />
      </div>
    </>
  )
}

SeancePage.getLayout = (page) => page

const Header = () => {
  return (
    <header className="w-full py-6 pl-4 border-b border-b-white border-opacity-10">
      <nav className="flex items-start space-x-8 mb-5">
        <PageBackButton href={routesMap.premiere(16)} />
        <div className="flex flex-col space-y-4">
          <h1 className="text-xl leading-6 font-semibold max-w-[260px] w-full">
            Ральф и бегство из интернета
          </h1>
          <h5 className="text-sm leading-7 font-normal">
            24 сентября, Кинотеатр “Ватан”
          </h5>
        </div>
      </nav>
      <div className="flex items-center space-x-3 overflow-x-auto hide-scrollbar pr-4">
        <SeanceTimeListItem isActive />
        <SeanceTimeListItem isActive={false} />
        <SeanceTimeListItem isActive={false} />
        <SeanceTimeListItem isActive={false} />
        <SeanceTimeListItem isActive={false} />
        <SeanceTimeListItem isActive={false} />
      </div>
    </header>
  )
}

export default SeancePage
