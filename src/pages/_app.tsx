import { fork, serialize } from 'effector'
import { Provider } from 'effector-react/scope'
import Router from 'next/router'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import NProgress from 'nprogress'
import type { Scope } from 'effector'
import type { ReactElement } from 'react'

import 'nprogress/nprogress.css'
import 'keen-slider/keen-slider.min.css'

import { Layout } from '~widgets/layout'
import type { AppPropsWithLayout } from '~shared/next'

import '~shared/styles/main.css'
import '~shared/styles/font.css'

dayjs.locale(ru)
dayjs.extend(customParseFormat)

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

let clientScope: Scope

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  })

  if (typeof window !== 'undefined') clientScope = scope

  const getLayout = Component.getLayout ?? getDefaultLayout

  return (
    <Provider value={scope}>{getLayout(<Component {...pageProps} />)}</Provider>
  )
}

function getDefaultLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default MyApp
