import Image from 'next/image'

export const Logo = () => {
  return (
    <div className="w-max flex-shrink z-20">
      <Image width={105} height={62} src="/logo.svg" quality={100} alt="logo" />
    </div>
  )
}
