import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  scopeBind,
} from 'effector'

import { request } from '~shared/api'
import { normalizr } from '~shared/lib/normalizr'
import { stringifyParams } from '~shared/lib/stringify-params'
import { types } from '~shared/types'

import * as lib from './lib'

const SOCKET_URL = `${process.env.WEBSOCKET}/seances/`

type FetchPremiereSeancesParams = {
  date: string | null
} & Omit<types.FetchSeancesRequest, 'query'>

type SeanceOverall = types.FetchSeanceRequestDone['answer']['data']
type Seat = types.Seance['seats'][number]
type UpdateSeat = Pick<Seat, 'id' | 'status'>

export const resetBooked = createEvent()
export const seatUpdated = createEvent<UpdateSeat>()
export const closeSocket = createEvent()
const onMessage = createEvent<MessageEvent>()
const messageReceived = onMessage.map(({ data }) => JSON.parse(data))

const validateReceivedMessageFx = createEffect(lib.validate)
export const openSocketFx = createEffect((id: number) => {
  const socket = new WebSocket(`${SOCKET_URL + id}`)

  const messageReceived = scopeBind(onMessage)
  socket.addEventListener('message', (message) => messageReceived(message))

  return socket
})
const closeSocketFx = createEffect((socket: WebSocket) => {
  socket.close()
})

export const fetchPremiereSeancesFx = attach({
  effect: request.fetchSeancesRequestFx,
  mapParams: ({ id, ...params }: FetchPremiereSeancesParams) => ({
    id,
    query: stringifyParams({
      params,
      options: { skipNull: true, skipEmptyString: true },
    }),
  }),
})
export const fetchSeanceFx = attach({ effect: request.fetchSeanceRequestFx })
export const bookTicketFx = attach({ effect: request.bookTicketRequestFx })

export const $premiereSeances = createStore<types.PremiereSeance[]>([])
export const $seance = createStore<SeanceOverall | null>(null)
export const $book = createStore<null | types.Book>(null)

export const $seats = createStore<
  Record<number, types.Seance['seats'][number]>
>({})
const $socket = createStore<null | WebSocket>(null)

$premiereSeances.on(fetchPremiereSeancesFx.doneData, (_, { answer }) => [
  ...answer.data,
])
$seance.on(fetchSeanceFx.doneData, (_, { answer }) => answer.data)
$book.on(bookTicketFx.doneData, (_, { answer }) => answer).reset(resetBooked)
$seats.on(fetchSeanceFx.doneData, (_, { answer }) =>
  normalizr(answer.data.seance.seats)
)
$socket.on(openSocketFx.doneData, (_, socket) => socket).reset(closeSocketFx)

sample({
  clock: [closeSocket, openSocketFx],
  source: $socket,
  filter: Boolean,
  target: closeSocketFx,
})

sample({
  clock: messageReceived,
  target: validateReceivedMessageFx,
})

sample({
  clock: validateReceivedMessageFx.doneData,
  target: seatUpdated,
})

sample({
  clock: seatUpdated,
  source: $seats,
  filter: (seats, { id }) => !!seats[id],
  fn: (seats, { id, status }) => {
    const seat = seats[id]

    return { ...seats, [seat.id]: { ...seat, status } }
  },
  target: $seats,
})
