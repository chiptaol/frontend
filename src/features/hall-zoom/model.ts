import { createApi, createEvent, createStore } from 'effector'

export const setScale = createEvent<number>()

export const $scale = createStore(1).on(setScale, (_, scale) => scale)

export const { zoomIn, zoomOut } = createApi($scale, {
  zoomIn: (prev) => (prev >= 1.8 ? prev : prev + 0.1),
  zoomOut: (prev) => (prev <= 0.3 ? prev : prev - 0.1),
})
