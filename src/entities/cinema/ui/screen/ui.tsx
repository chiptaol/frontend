import Image from 'next/image'

export const CinemaScreen = () => {
  return (
    <div className="w-full flex justify-center">
      <Image
        width={320}
        height={56}
        className="object-cover"
        src="/screen.png"
        alt="screen"
      />
    </div>
  )
}
