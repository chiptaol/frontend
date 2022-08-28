import { useList, useStoreMap, useUnit } from 'effector-react'
import Image from 'next/image'
import { imageSrc } from '~shared/config'
import { convertToSum } from '~shared/lib/convert-to-sum'
import { formatDate } from '~shared/lib/format-date'

import * as model from '../model'

export const SeanceBookedTicket = () => {
  return (
    <div className="flex flex-col space-y-1.5 w-full">
      <Movie />
      <Pricing />
    </div>
  )
}

const Movie = () => {
  const booked = useUnit(model.$book)

  if (!booked) return null

  return (
    <div className="w-full rounded-xl bg-darkBlue-600 p-5">
      <div className="flex space-x-4 items-end mb-6">
        <Image
          width={125}
          height={178}
          className="object-cover flex-shrink-0 object-top rounded-xl"
          src={imageSrc(booked.movie.poster_path)}
          alt="poster"
        />
        <div className="flex flex-col space-y-2">
          <p className="text-sm leading-4 font-semibold text-white opacity-50">
            {booked.movie.original_title}
          </p>
          <h2 className="text-xl leading-6 font-bold">{booked.movie.title}</h2>
          <p className="text-xs leading-4 text-white opacity-50">
            {booked.movie.genres.join(', ')}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        <GridItem label="Кинотеатр" title={booked.cinema_title} />
        <GridItem label="Зал" title={booked.hall_title} />
        <GridItem
          label="Дата"
          title={formatDate(booked.start_date_time, 'DD MMM, YYYY')}
        />
        <GridItem
          label="Время"
          title={formatDate(booked.start_date_time, 'HH:mm')}
        />
      </div>
    </div>
  )
}

const Pricing = () => {
  const total = useStoreMap(model.$book, (book) =>
    (book?.seats ?? []).reduce((acc, next) => acc + next.price, 0)
  )
  const seatsPrices = useList(
    model.$book.map((book) => book?.seats ?? []),
    (seat) => (
      <PriceRow
        key={seat.id}
        label={`${seat.row} ряд, ${seat.place} место`}
        title={`${convertToSum(seat.price)} сум`}
      />
    )
  )

  return (
    <div className="w-full px-4 py-5 flex flex-col space-y-4 bg-darkBlue-600 rounded-xl">
      {seatsPrices}
      <div className="flex items-end w-full space-x-1">
        <b className="flex-shrink-0 text-xl leading-4 font-extrabold">Итого</b>
        <hr className="w-4/5 border-dashed border-violet-100" />
        <p className="flex-shrink-0 text-lg leading-5 font-bold">
          {convertToSum(total)} сум
        </p>
      </div>
    </div>
  )
}

const GridItem = ({ title, label }: { title: string; label: string }) => {
  return (
    <div className="flex flex-col space-y-2">
      <span className="text-violet-100 text-sm leading-5">{label}</span>
      <p className="text-base leading-5 font-medium">{title}</p>
    </div>
  )
}

const PriceRow = ({ label, title }: { label: string; title: string }) => {
  return (
    <div className="flex items-end w-full space-x-1">
      <span className="flex-shrink-0 text-sm leading-5 text-violet-100">
        {label}
      </span>
      <hr className="w-4/5 border-dashed border-violet-100 -translate-y-1.5" />
      <p className="flex-shrink-0 text-sm leading-5 font-semibold">{title}</p>
    </div>
  )
}
