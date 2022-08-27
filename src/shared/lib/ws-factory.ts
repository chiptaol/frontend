import {
  createApi,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'

enum WS_STATUS {
  open = 'open',
  close = 'close',
  error = 'error',
}

export const wsFactory = (url: string) => {
  const closeSocket = createEvent()

  const $status = createStore<WS_STATUS>(WS_STATUS.open)
  const $socket = createStore<null | WebSocket>(null)

  const { error, onClose, onOpen } = createApi($status, {
    onOpen: (__: WS_STATUS, _: unknown) => WS_STATUS.open,
    onClose: (__: WS_STATUS, _: unknown) => WS_STATUS.close,
    error: (__: WS_STATUS, _: unknown) => WS_STATUS.error,
  })

  const onMessage = createEvent<MessageEvent>()
  const messageReceived = onMessage.map(({ data }) => JSON.parse(data))

  onOpen.watch(() => console.info('WS: Connection opened'))
  onClose.watch(() => console.warn('WS: Connection closed'))
  error.watch(() => console.error('WS: Connection error'))

  const openSocketFx = createEffect((path: string) => {
    const socket = new WebSocket(`${url + path}/`)

    socket.addEventListener('open', onOpen)
    socket.addEventListener('close', onClose)
    socket.addEventListener('error', error)
    socket.addEventListener('message', onMessage)

    return socket
  })

  const closeSocketFx = createEffect((socket: WebSocket) => {
    socket.removeEventListener('open', onOpen)
    socket.removeEventListener('close', onClose)
    socket.removeEventListener('error', error)
    socket.removeEventListener('message', onMessage)

    socket.close()
  })

  $socket.on(openSocketFx.doneData, (_, socket) => socket).reset(error, onClose)

  sample({
    clock: [closeSocket, openSocketFx],
    source: $socket,
    filter: Boolean,
    target: closeSocketFx,
  })

  return {
    openSocketFx,
    closeSocket,
    messageReceived,
  }
}
