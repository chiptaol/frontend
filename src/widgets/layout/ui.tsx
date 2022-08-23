import { Footer, Header } from '~shared/ui'

type Props = {
  children: React.ReactNode
}

export const Layout = (props: Props) => {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <main className="flex-grow overflow-y-auto py-9">{props.children}</main>
      <Footer />
    </div>
  )
}
