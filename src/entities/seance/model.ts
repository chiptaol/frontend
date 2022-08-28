import {
  attach,
  createApi,
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
enum WS_STATUS {
  open = 'open',
  close = 'close',
  error = 'error',
}

export const resetBooked = createEvent()
export const seatUpdated = createEvent<UpdateSeat>()

export const closeSocket = createEvent()

const $status = createStore<WS_STATUS>(WS_STATUS.open)
const $socket = createStore<null | WebSocket>(null)

const { error, onClose } = createApi($status, {
  onOpen: (__: WS_STATUS, _: unknown) => WS_STATUS.open,
  onClose: (__: WS_STATUS, _: unknown) => WS_STATUS.close,
  error: (__: WS_STATUS, _: unknown) => WS_STATUS.error,
})

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
  const messageReceived = scopeBind(onMessage)
  socket.removeEventListener('message', messageReceived)

  socket.close()
})

$socket.on(openSocketFx.doneData, (_, socket) => socket).reset(error, onClose)

sample({
  clock: [closeSocket, openSocketFx],
  source: $socket,
  filter: Boolean,
  target: closeSocketFx,
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

$premiereSeances.on(fetchPremiereSeancesFx.doneData, (_, { answer }) => [
  ...answer.data,
])
$seance.on(fetchSeanceFx.doneData, (_, { answer }) => answer.data)
$book.on(bookTicketFx.doneData, (_, { answer }) => answer).reset(resetBooked)
$seats.on(fetchSeanceFx.doneData, (_, { answer }) =>
  normalizr(answer.data.seance.seats)
)

sample({
  clock: messageReceived,
  target: validateReceivedMessageFx,
})

sample({
  clock: validateReceivedMessageFx.doneData,
  source: $seats,
  filter: (seats, { id }) => !!seats[id],
  fn: (seats, { id, status }) => {
    const seat = seats[id]

    console.log(seat, status)

    return { ...seats, [seat.id]: { ...seat, status } }
  },
  target: $seats,
})
