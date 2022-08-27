import { forwardRef } from 'react'
import cn from 'classnames'

import { Spinner } from '../spinner'
import PaymeIcon from './payme.svg'
import ClickIcon from './click.svg'
import ApelsinIcon from './apelsin.svg'

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'disabled'
>

type Variant = 'apelsin' | 'click' | 'payme'

type ButtonProps = NativeButtonProps & {
  /**
   * variants of button
   * `click` | `payme` | `apelsin`
   */
  variant: Variant
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
}

const icon: Record<Variant, any> = {
  payme: <PaymeIcon />,
  click: <ClickIcon />,
  apelsin: <ApelsinIcon />,
}

const title: Record<Variant, string> = {
  payme: 'PayMe',
  apelsin: 'Apelsin',
  click: 'Click',
}

export const PromoButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className = '',
      type = 'button',
      loading = false,
      disabled = false,
      variant,
      ...rest
    } = props

    const isDisabled = loading || disabled

    return (
      <button
        ref={ref}
        className={cn(
          'transition-all text-base leading-3 w-full text-black-500 h-[52px] font-bold rounded-xl flex justify-center items-center space-x-4 hover:bg-opacity-80 disabled:bg-opacity-50 focus:outline-none focus:ring focus-visible:ring',
          className,
          {
            'cursor-not-allowed': disabled,
            'cursor-wait': loading,
            'bg-[#53B7D1]': variant === 'click',
            'bg-[#F89440]': variant === 'apelsin',
            'bg-[#00CCCC]': variant === 'payme',
          }
        )}
        disabled={isDisabled}
        type={type}
        {...rest}
      >
        {loading ? (
          <Spinner className="fill-white" />
        ) : (
          <>
            {icon[variant]}
            <span>Оплата через {title[variant]}</span>
          </>
        )}
      </button>
    )
  }
)
