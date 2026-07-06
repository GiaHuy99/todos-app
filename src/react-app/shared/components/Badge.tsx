import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'text-ink-muted',
  success: 'text-success',
  warning: 'text-ink-muted',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-xs font-normal',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
