import Link from 'next/link'

import { Button, Head } from '~shared/ui'
import { IconFilm } from '~shared/assets'
import { META } from '~shared/config'

const ServerErrorPage = () => {
  return (
    <>
      <Head {...META[500]} />
      <div className="w-full h-full flex flex-col items-center justify-center space-y-16 max-w-xs mx-auto">
        <div className="text-center flex w-full flex-col space-y-6 justify-center">
          <div className="flex items-center text-8xl font-semibold w-full justify-center">
            <h1 className="mr-3">5</h1>
            <IconFilm />
            <IconFilm className="-scale-x-100 -translate-y-[0.65px]" />
          </div>
          <div className="w-full">
            <h2 className="max-w-[220px] w-full mx-auto text-center font-extrabold text-xl mb-5">
              Возникла ошибка на сервере(
            </h2>
            <p className="mb-4 text-base font-medium">
              На сайте ведутся технические работы, мы стараемся сделать очень крутой сервис для вас.
            </p>
            <h3 className="text-base font-extrabold">Благодарим за ваше терпение!</h3>
          </div>
        </div>
        <Link href="/">
          <a className="w-full">
            <Button>Вернуться к премьерам</Button>
          </a>
        </Link>
      </div>
    </>
  )
}

export default ServerErrorPage
