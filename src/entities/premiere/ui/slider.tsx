import Link from 'next/link'
import Image from 'next/image'
import { useUnit } from 'effector-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'

import { formatDate } from '~shared/lib/format-date'
import { routesMap } from '~shared/routes'

import * as model from '../model'

const SERVER_DOMAIN = process.env.SERVER_STORAGE_DOMAIN

export const PremieresSlider = () => {
  const premieres = useUnit(model.$actualPremieres)
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
      {premieres.map((premiere) => (
        <SwiperSlide key={premiere.id}>
          <Link href={routesMap.premiere(premiere.id)}>
            <a>
              <div className="relative w-full h-52 sm:h-72 flex items-end overflow-hidden rounded-lg">
                <Image
                  layout="fill"
                  quality={100}
                  className="absolute inset-0 object-cover"
                  src={`${SERVER_DOMAIN}/${premiere.backdrop_path}`}
                  alt="slider_image"
                />
                <div className="flex flex-col space-y-3 relative px-3 py-7 bg-sliderContent w-full">
                  <h4 className="font-semibold text-lg leading-5 truncate w-3/4">
                    {premiere.title}
                  </h4>
                  <span className="text-yellow-500 text-xs">
                    С {formatDate(premiere.release_date, 'DD MMMM')}
                  </span>
                </div>
              </div>
            </a>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
