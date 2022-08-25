import ScreenIcon from './screen.svg'

export const CinemaScreen = () => {
  return (
    <div className="relative text-center">
      <ScreenIcon />
      <div className="absolute inset-x-0 top-10 text-center">
        <span className="text-[#B5B5B5] text-xs font-light">Экран</span>
      </div>
    </div>
  )
}
