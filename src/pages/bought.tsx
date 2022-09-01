import Image from 'next/image'
import Link from 'next/link'

import { routesMap } from '~shared/routes'
import { Button, PageBackButton } from '~shared/ui'
import type { NextPageWithLayout } from '~shared/next'
import Head from 'next/head'

const BoughtPage: NextPageWithLayout = () => {
  return (
    <>
      <Helmet />
      <div className="max-w-7xl w-full h-full flex flex-col space-y-16 px-4 py-6 mx-auto">
        <PageBackButton href={routesMap.home} className="mb" />
        <div className="max-w-md flex-grow w-full text-center mx-auto">
          <Image width={125} height={160} src="/bear.png" alt="bear" className="mb-8" />
          <h1 className="text-xl font-extrabold mb-6">Спасибо что прошли бета-тестирование!</h1>
          <p className="text-base font-medium mb-5">
            Сервис находится в стадии открытого бета-тестирования, Мы стараемся сделать очень крутой
            сервис для Вас.
          </p>
          <h4 className="text-base font-extrabold mb-20">Благодарим за ваше терпение!</h4>
          <Link href={routesMap.home}>
            <a className="w-full">
              <Button>Вернуться к премьерам</Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

const Helmet = () => {
  return (
    <Head>
      <title>chiptaol.uz</title>
      <meta
        name="description"
        content={`
            Надоело стоять в кассах или приходить, когда уже все билеты распроданы? 
            Для этого не обязательно ехать в кинотеатр, вы можете купить билеты прямо у нас.
          `}
      />
      <link rel="icon" href="/logo.svg" />
    </Head>
  )
}

BoughtPage.getLayout = (page) => page

export default BoughtPage
