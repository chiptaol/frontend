import Image from 'next/image'
import Link from 'next/link'

import { routesMap } from '~shared/routes'
import { Button, Head, PageBackButton } from '~shared/ui'
import { META } from '~shared/config'
import type { NextPageWithLayout } from '~shared/next'

const BoughtPage: NextPageWithLayout = () => {
  return (
    <>
      <Head {...META.default} />

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

BoughtPage.getLayout = (page) => page

export default BoughtPage
