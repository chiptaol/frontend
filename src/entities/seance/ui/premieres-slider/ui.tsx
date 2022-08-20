import { Swiper, SwiperSlide } from 'swiper/react'

export const PremieresSlider = () => {
  return (
    <Swiper slidesPerView={1.25} centeredSlides loop spaceBetween={16}>
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
