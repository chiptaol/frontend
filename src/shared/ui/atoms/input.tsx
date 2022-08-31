import cn from 'classnames'
import { forwardRef } from 'react'

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>

export type InputProps = NativeInputProps & {
  LeftIcon?: React.ReactNode
  className?: string
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { LeftIcon, invalid, className = '', ...rest } = props
  return (
    <div className="w-full h-12 relative">
      {LeftIcon && <span className="absolute h-6 w-6 top-3 left-5">{LeftIcon}</span>}
      <input
        ref={ref}
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
})
