import Link from 'next/link'
import Image from 'next/image'
import { useUnit } from 'effector-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import cn from 'classnames'

import { formatDate } from '~shared/lib/format-date'
import { routesMap } from '~shared/routes'
import { imageSrc } from '~shared/config'

import * as model from '../model'

export const PremieresSlider = () => {
  const premieres = useUnit(model.$actualPremieres)
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ stopOnInteraction: false, stopOnMouseEnter: true }),
  ])

  if (premieres.length === 0) return null

  return (
    <div ref={emblaRef} className="embla overflow-hidden max-w-7xl w-full mx-auto">
      <div className="embla__container grid grid-flow-col auto-cols-[80%]">
        {premieres.map((premiere) => (
          <div className="embla__slide mr-4" key={premiere.id}>
            <Link href={routesMap.premiere(premiere.id)}>
              <a>
                <div
                  className={cn(
                    'relative w-full h-52 sm:h-72 md:h-80 lg:h-96 flex items-end overflow-hidden rounded-lg'
                  )}
                >
                  <Image
                    priority
                    layout="fill"
                    quality={100}
                    className="absolute inset-0 object-cover"
                    src={imageSrc(premiere.backdrop_path)}
                    alt="slider_image"
                  />
                  <div className="flex flex-col space-y-3 relative px-3 py-7 bg-sliderContent w-full">
                    <h2 className="font-semibold text-lg leading-5 truncate w-3/4">
                      {premiere.title}
                    </h2>
                    <span className="text-yellow-500 text-xs">
                      С {formatDate(premiere.release_date, 'DD MMMM')}
                    </span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
