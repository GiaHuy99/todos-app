import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'
import { Spinner } from '@/shared/components/Spinner'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger'
type ButtonSize = 'sm' | 'md'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  loadingText?: string
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-focus',
  secondary:
    'border border-hairline bg-surface-1 text-ink hover:border-hairline-strong hover:bg-surface-2 active:bg-surface-3',
  tertiary:
    'bg-transparent text-ink hover:bg-surface-1 active:bg-surface-2',
  danger:
    'border border-hairline bg-surface-1 text-ink hover:border-hairline-strong hover:bg-surface-2 hover:text-error active:bg-surface-3',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-9 px-3 py-1.5 text-sm',
  md: 'min-h-10 px-3.5 py-2 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  disabled,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50',
        'disabled:pointer-events-none disabled:opacity-40',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          {loadingText ?? children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
