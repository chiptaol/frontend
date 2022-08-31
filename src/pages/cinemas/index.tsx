import Head from 'next/head'

import type { NextPage } from 'next'

const CinemasPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Кинотеатры</title>
        <meta name="title" content="Кинотеатры" />
        <meta
          name="description"
          content="Надоело стоять в очередях или приходить, когда уже все билеты в кино распроданы? У нас можно купить билеты онлайн!"
        />
        <meta
          property="og:title"
          content="Chiptaol - Онлайн-покупка билетов в кинотеатры Ташкента"
        />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:site_name" content="Chiptaol" />
        <meta
          property="og:description"
          content="Надоело стоять в кассах или приходить, когда уже все билеты распроданы? Для этого не обязательно ехать в кинотеатр, Вы можете купить билеты онлайн у нас."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="w-full">Cinemas page</div>
    </>
  )
}

export default CinemasPage
