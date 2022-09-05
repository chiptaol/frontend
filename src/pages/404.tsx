import Link from 'next/link'

import { Button, Head } from '~shared/ui'
import { IconFilm } from '~shared/assets'
import { META } from '~shared/config'

const NotFoundPage = () => {
  return (
    <>
      <Head {...META[404]} />
      <div className="w-full h-full flex flex-col items-center justify-center space-y-16 max-w-xs mx-auto">
        <div className="text-center flex w-full flex-col space-y-6 justify-center">
          <div className="flex items-center space-x-5 text-8xl font-semibold w-full justify-center">
            <h1>4</h1>
            <IconFilm />
            <h1>4</h1>
          </div>
          <div className="w-full">
            <h2 className="max-w-[220px] w-full mx-auto text-center font-extrabold text-xl mb-5">
              Данная страница не найдена(
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

// const Helmet = () => {
//   return (
//     <Head>
//       <title>404 - Страница не найдена</title>
//       <meta
//         name="description"
//         content="Надоело стоять в очередях или приходить, когда уже все билеты в кино распроданы? У нас можно купить билеты онлайн!"
//       />
//       <meta property="og:title" content="Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента" />
//       <meta property="og:locale" content="ru_RU" />
//       <meta property="og:site_name" content="Chiptaol" />
//       <meta
//         property="og:description"
//         content="Надоело стоять в кассах или приходить, когда уже все билеты распроданы? Для этого не обязательно ехать в кинотеатр, Вы можете купить билеты онлайн у нас."
//       />

//       <link rel="icon" href="/logo.svg" />
//     </Head>
//   )
// }

export default NotFoundPage
