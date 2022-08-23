export const SERVER_DATE_FORMAT = 'YYYY-MM-DD'

const SERVER_STORAGE_DOMAIN = process.env.SERVER_STORAGE_DOMAIN

export function imageSrc(url: string) {
  return `${SERVER_STORAGE_DOMAIN}/${url}`
}
