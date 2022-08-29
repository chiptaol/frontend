import { forwardRef } from 'react'
import cn from 'classnames'

import { Spinner } from '../atoms'

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled'
>

type ButtonTheme = 'primary' | 'secondary' | 'danger'
type ButtonVariant = 'solid' | 'outline'
type Theme = {
  solid: string
  outline: string
}

type ButtonProps = NativeButtonProps & {
  /**
   * If `true`, the button will be disabled.
   */
  disabled?: boolean
  /**
   * If `true`, the button will be disabled and spinner will be shown.
   */
  loading?: boolean
  /**
   * tw utility-classnames
   */
  className?: string
  /**
   * Button theme
   * @default primary
   */
  theme?: ButtonTheme
  /**
   * Button variant
   * @default solid
   */
  variant?: ButtonVariant
}

const ButtonTheme: Record<ButtonTheme, Theme> = {
  primary: {
    solid: 'text-black-500 bg-yellow-500 focus:ring-yellow-300',
    outline:
      'text-blue-500 border-2 border-blue-500 disabled:opacity-50 focus:ring-blue-300',
  },
  secondary: {
    solid: 'text-black-500 bg-blue-50 focus:ring-blue-200',
    outline: 'noop',
  },
  danger: {
    solid: 'text-white bg-red-500 focus:ring-red-300',
    outline:
      'text-red-500 border-2 border-red-500 disabled:opacity-50 focus:ring-red-300',
  },
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className = '',
    theme = 'primary',
    variant = 'solid',
    type = 'button',
    loading = false,
    disabled = false,
    children,
    ...rest
  } = props

  const isDisabled = loading || disabled
  const palette = ButtonTheme[theme][variant]

  return (
    <button
      ref={ref}
      className={cn(
        'transition-all text-base leading-3 w-full font-bold py-5 rounded-xl flex justify-center items-center hover:bg-opacity-80 disabled:bg-opacity-50 focus:outline-none focus:ring focus-visible:ring',
        palette,
        className,
        {
          'cursor-not-allowed': disabled,
          'cursor-wait': loading,
        }
      )}
      disabled={isDisabled}
      type={type}
      {...rest}
    >
      {loading ? <Spinner className="fill-white" /> : children}
    </button>
  )
})

export { Button }
