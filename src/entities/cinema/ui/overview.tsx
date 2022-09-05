import { Disclosure } from '@headlessui/react'
import { useUnit } from 'effector-react'
import cn from 'classnames'

import { IconRight } from '~shared/assets'

import * as model from '../model'
import Image from 'next/image'
import { imageSrc } from '~shared/config'
import { Button } from '~shared/ui'
import { stringifyParams } from '~shared/lib/stringify-params'

export const CinemaOverview = () => {
  const cinema = useUnit(model.$cinema)

  if (!cinema) return null

  return (
    <div className="w-full flex flex-col space-y-5 mb-6">
      <div className="flex flex-col space-y-6 px-4">
        <div className="w-32 h-32 rounded-xl overflow-hidden bg-yellow-200">
          {!!cinema.logo?.path && (
            <Image
              width={128}
              height={128}
              className="object-contain"
              src={imageSrc(cinema.logo.path)}
              alt={cinema.title}
            />
          )}
        </div>
        <h2 className="text-lg leading-5 font-semibold">Кинотеатр &quot;{cinema.title}&quot;</h2>
      </div>
      <Disclosure>
        <Disclosure.Button className="flex items-center justify-between border-y border-opacity-10 border-white px-4 py-5">
          {({ open }) => (
            <>
              <span className="text-sm leading-4">Место на карте и информация</span>
              <IconRight
                className={cn('transition-transform', {
                  'rotate-90': open,
                })}
              />
            </>
          )}
        </Disclosure.Button>
        <Disclosure.Panel className="flex flex-col space-y-2 px-4 pb-2">
          <div className="grid grid-cols-[max-content_1fr] gap-y-4">
            <ListItem label="Адрес" content={cinema.address ?? '-'} />
            <ListItem label="Ориентир" content={cinema.reference_point ?? '-'} />
            <ListItem label="Телефон" content={cinema.phone ?? '-'} />
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://yandex.ru/maps/${prepareCinemaLocation(
              cinema.latitude,
              cinema.longitude
            )}`}
          >
            <Button className="max-w-xs">Открыть локацию на карте</Button>
          </a>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

type ListItemProps = {
  label: string
  content: string
}

const ListItem = (props: ListItemProps) => {
  return (
    <>
      <p className="text-violet-100 text-sm leading-5 font-semibold border-b border-b-white border-opacity-10 pb-4">
        {props.label}
      </p>
      <p className="text-sm leading-5 font-semibold border-b border-b-white border-opacity-10 pl-8 pb-4">
        {props.content}
      </p>
    </>
  )
}

function prepareCinemaLocation(latitude: number | null | void, longitude: number | null | void) {
  if (!latitude || !longitude) return ''

  return stringifyParams({ params: { pt: `${longitude},${latitude}`, z: 17 } })
}
