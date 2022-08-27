import Head from 'next/head'
import Link from 'next/link'

import FilmIcon from '~shared/assets/film.svg'
import { Button } from '~shared/ui'

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 - Страница не найдена</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="w-full h-full flex flex-col items-center justify-center space-y-16 max-w-xs mx-auto">
        <div className="text-center flex w-full flex-col space-y-6 justify-center">
          <div className="flex items-center space-x-5 text-8xl font-semibold w-full justify-center">
            <h1>4</h1>
            <FilmIcon />
            <h1>4</h1>
          </div>
          <div className="w-full">
            <h2 className="max-w-[220px] w-full mx-auto text-center font-extrabold text-xl mb-5">
              Данная страница не найдена(
            </h2>
            <p className="mb-4 text-base font-medium">
              На сайте ведутся технические работы, мы стараемся сделать очень
              крутой сервис для вас.
            </p>
            <h5 className="text-base font-extrabold">
              Благодарим за ваше терпение!
            </h5>
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

export default NotFoundPage
