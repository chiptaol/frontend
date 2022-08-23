import qs from 'query-string'

type Props = {
  params: object
  /**
   * if `true` result will be `?query`, else only `query`
   * @default true
   */
  withQuerySymbol?: boolean
  options?: qs.StringifyOptions
}

export const stringifyParams = ({
  params,
  withQuerySymbol = true,
  options,
}: Props) => {
  const parsed = qs.stringify(params, options)

  if (withQuerySymbol) return parsed !== '' ? `?${parsed}` : ''

  return parsed
}
