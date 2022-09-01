import Image from 'next/image'

export const CinemaScreen = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-xs h-14 md:max-w-md md:h-28">
        <Image
          layout="fill"
          className="absolute inset-0 object-cover"
          src="/screen.png"
          alt="screen"
        />
      </div>
    </div>
  )
}
