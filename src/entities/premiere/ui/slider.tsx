import Link from 'next/link'
import Image from 'next/image'
import { useUnit } from 'effector-react'
import { useCallback, useEffect, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'

import { formatDate } from '~shared/lib/format-date'
import { routesMap } from '~shared/routes'
import { imageSrc } from '~shared/config'

import * as model from '../model'

export const PremieresSlider = () => {
  const premieres = useUnit(model.$actualPremieres)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const slidesLength = premieres.length

  const autoPlay = useCallback(
    (play: boolean) => {
      clearInterval(intervalRef.current ?? 0)
      if (instanceRef.current && play && slidesLength >= 3) {
        intervalRef.current = setInterval(() => {
          instanceRef.current?.next()
        }, 5000)
      }
    },
    [slidesLength]
  )

  const [ref, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,

    slides: {
      perView: 1.25,
      origin: 'center',
      spacing: 16,
    },
    dragStarted: () => {
      autoPlay(false)
    },
    dragEnded: () => {
      autoPlay(true)
    },
  })

  useEffect(() => {
    autoPlay(true)
    return () => {
      clearInterval(intervalRef.current ?? 0)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="keen-slider"
      onMouseOver={() => {
        autoPlay(false)
      }}
      onMouseOut={() => {
        autoPlay(true)
      }}
    >
      {premieres.map((premiere) => (
        <div className="keen-slider__slide" key={premiere.id}>
          <Link href={routesMap.premiere(premiere.id)}>
            <a>
              <div className="relative w-full h-52 sm:h-72 flex items-end overflow-hidden rounded-lg bg-red-50">
                {/* <Image
                  priority
                  layout="fill"
                  quality={100}
                  className="absolute inset-0 object-cover"
                  src={imageSrc(premiere.backdrop_path)}
                  alt="slider_image"
                /> */}
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
        </div>
      ))}
    </div>
  )
}
