import { fork, serialize } from 'effector'
import { Provider } from 'effector-react/scope'
import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import type { ReactElement } from 'react'
import type { Scope } from 'effector'

import 'swiper/css'

import { Layout } from '~widgets/layout'
import type { AppPropsWithLayout } from '~shared/next'

import '~shared/styles/main.css'
import '~shared/styles/font.css'

dayjs.locale(ru)

let clientScope: Scope

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  })

  if (typeof window === 'undefined') clientScope = scope
  console.log('scope', serialize(scope))

  const getLayout = Component.getLayout ?? getDefaultLayout

  return (
    <Provider value={scope}>{getLayout(<Component {...pageProps} />)}</Provider>
  )
}

function getDefaultLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default MyApp
