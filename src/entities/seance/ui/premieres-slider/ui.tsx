import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

export const PremieresSlider = () => {
  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      slidesPerView={1.25}
      centeredSlides
      loop
      spaceBetween={16}
      modules={[Autoplay]}
    >
      <SwiperSlide>
        <div className="w-full rounded-lg bg-red-500 h-52" />
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full rounded-lg bg-blue-500 h-52" />
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full rounded-lg bg-yellow-500 h-52" />
      </SwiperSlide>
    </Swiper>
  )
}
