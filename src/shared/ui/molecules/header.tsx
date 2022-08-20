import { Logo } from '../atoms'

export const Header = () => {
  return (
    <header className="flex items-end space-x-5 px-4 pb-4 border-b border-white border-opacity-10">
      <Logo />
      <h1 className="text-yellow-500 font-bold text-base leading-5">
        Онлайн-покупка
        <br />
        билетов в кино
      </h1>
    </header>
  )
}
