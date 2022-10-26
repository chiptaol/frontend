import { default as NextHead } from 'next/head'

type Props = {
  title: string
  description: string
  ogDescription?: string
}

export const Head = (props: Props) => {
  return (
    <NextHead>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Chiptaol" />
      <meta property="og:url" content="https://chiptaol.uz" />
      <meta prefix="og: https://chiptaol.uz/ns#" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://chiptaol.uz/og-image.png" />
      <meta property="og:image" content="https://chiptaol.uz/og-image.png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="730" />
      <meta name="google-site-verification" content="LF1qrfqLMTy7QT1Vqi_eV3htIyfrct4FU0vD7tAIYo8" />
      <meta property="og:description" content={props.ogDescription ?? props.description} />
      <link rel="icon" href="/logo.svg" />
    </NextHead>
  )
}
