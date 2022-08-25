export const convertToSum = (price: number) => {
  return new Intl.NumberFormat().format(price / 100).replaceAll(',', ' ')
}
