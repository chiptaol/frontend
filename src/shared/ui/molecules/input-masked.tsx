import ReactInputMask from 'react-input-mask'
import cn from 'classnames'

import type { InputProps } from '../atoms/input'

type Props = InputProps

const PHONE_MASK = [
  '+',
  '9',
  '9',
  '8',
  ' ',
  /[1-9]/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
]

export const InputMasked = (props: Props) => {
  const { LeftIcon, invalid, className = '', ...rest } = props

  return (
    <div className="w-full h-12 relative">
      {LeftIcon && <span className="absolute h-6 w-6 top-3 left-5">{LeftIcon}</span>}
      <ReactInputMask
        mask="+\9\9\8\ 99 999 99 99"
        className={cn(
          `border border-darkBlue-400 rounded-xl bg-darkBlue-600 
           h-12 w-full pr-5 pl-14 
         text-white text-base leading-4 
           placeholder:font-sans focus:outline focus:outline-violet-100 
           ${className}`,
          {
            'border-red-500': invalid,
          }
        )}
        {...rest}
      />
    </div>
  )
}
