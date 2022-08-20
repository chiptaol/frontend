import type { ReactElement } from 'react'

import 'swiper/css'

import { Layout } from '~widgets/layout'
import type { AppPropsWithLayout } from '~shared/next'

import '~shared/styles/main.css'
import '~shared/styles/font.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout

  return getLayout(<Component {...pageProps} />)
}

function getDefaultLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default MyApp
